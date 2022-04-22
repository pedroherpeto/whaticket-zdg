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
const AppError_1 = __importDefault(require("../../errors/AppError"));
const GetWbotMessage_1 = __importDefault(require("../../helpers/GetWbotMessage"));
const Message_1 = __importDefault(require("../../models/Message"));
const Ticket_1 = __importDefault(require("../../models/Ticket"));
const DeleteWhatsAppMessage = (messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const message = yield Message_1.default.findByPk(messageId, {
        include: [
            {
                model: Ticket_1.default,
                as: "ticket",
                include: ["contact"]
            }
        ]
    });
    if (!message) {
        throw new AppError_1.default("No message found with this ID.");
    }
    const { ticket } = message;
    const messageToDelete = yield GetWbotMessage_1.default(ticket, messageId);
    try {
        yield messageToDelete.delete(true);
    }
    catch (err) {
        throw new AppError_1.default("ERR_DELETE_WAPP_MSG");
    }
    yield message.update({ isDeleted: true });
    return message;
});
exports.default = DeleteWhatsAppMessage;
