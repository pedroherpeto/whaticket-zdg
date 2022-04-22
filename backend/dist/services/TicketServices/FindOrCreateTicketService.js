"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const sequelize_1 = require("sequelize");
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const ShowTicketService_1 = __importDefault(require("./ShowTicketService"));
const FindOrCreateTicketService = (contact, whatsappId, unreadMessages, groupContact) => __awaiter(void 0, void 0, void 0, function* () {
    let ticket = yield Ticket_1.default.findOne({
        where: {
            status: {
                [sequelize_1.Op.or]: ["open", "pending"]
            },
            contactId: groupContact ? groupContact.id : contact.id
        }
    });
    if (ticket) {
        yield ticket.update({ unreadMessages });
    }
    if (!ticket && groupContact) {
        ticket = yield Ticket_1.default.findOne({
            where: {
                contactId: groupContact.id
            },
            order: [["updatedAt", "DESC"]]
        });
        if (ticket) {
            yield ticket.update({
                status: "pending",
                userId: null,
                unreadMessages
            });
        }
    }
    if (!ticket && !groupContact) {
        ticket = yield Ticket_1.default.findOne({
            where: {
                updatedAt: {
                    [sequelize_1.Op.between]: [+date_fns_1.subHours(new Date(), 2), +new Date()]
                },
                contactId: contact.id
            },
            order: [["updatedAt", "DESC"]]
        });
        if (ticket) {
            yield ticket.update({
                status: "pending",
                userId: null,
                unreadMessages
            });
        }
    }
    if (!ticket) {
        ticket = yield Ticket_1.default.create({
            contactId: groupContact ? groupContact.id : contact.id,
            status: "pending",
            isGroup: !!groupContact,
            unreadMessages,
            whatsappId
        });
    }
    ticket = yield ShowTicketService_1.default(ticket.id);
    return ticket;
});
exports.default = FindOrCreateTicketService;
