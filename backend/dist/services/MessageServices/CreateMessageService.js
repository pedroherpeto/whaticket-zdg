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
const socket_1 = require("../../libs/socket");
const Message_1 = __importDefault(require("../../models/Message"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const CreateMessageService = ({ messageData }) => __awaiter(void 0, void 0, void 0, function* () {
    yield Message_1.default.upsert(messageData);
    const message = yield Message_1.default.findByPk(messageData.id, {
        include: [
            "contact",
            {
                model: Ticket_1.default,
                as: "ticket",
                include: ["contact", "queue"]
            },
            {
                model: Message_1.default,
                as: "quotedMsg",
                include: ["contact"]
            }
        ]
    });
    if (!message) {
        throw new Error("ERR_CREATING_MESSAGE");
    }
    const io = socket_1.getIO();
    io.to(message.ticketId.toString())
        .to(message.ticket.status)
        .to("notification")
        .emit("appMessage", {
        action: "create",
        message,
        ticket: message.ticket,
        contact: message.ticket.contact
    });
    return message;
});
exports.default = CreateMessageService;
