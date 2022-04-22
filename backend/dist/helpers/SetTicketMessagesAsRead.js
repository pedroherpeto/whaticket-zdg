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
const socket_1 = require("../libs/socket");
const Message_1 = __importDefault(require("../models/Message"));
const logger_1 = require("../utils/logger");
const GetTicketWbot_1 = __importDefault(require("./GetTicketWbot"));
const SetTicketMessagesAsRead = (ticket) => __awaiter(void 0, void 0, void 0, function* () {
    yield Message_1.default.update({ read: true }, {
        where: {
            ticketId: ticket.id,
            read: false
        }
    });
    yield ticket.update({ unreadMessages: 0 });
    try {
        const wbot = yield GetTicketWbot_1.default(ticket);
        yield wbot.sendSeen(`${ticket.contact.number}@${ticket.isGroup ? "g" : "c"}.us`);
    }
    catch (err) {
        logger_1.logger.warn(`Could not mark messages as read. Maybe whatsapp session disconnected? Err: ${err}`);
    }
    const io = socket_1.getIO();
    io.to(ticket.status).to("notification").emit("ticket", {
        action: "updateUnread",
        ticketId: ticket.id
    });
});
exports.default = SetTicketMessagesAsRead;
