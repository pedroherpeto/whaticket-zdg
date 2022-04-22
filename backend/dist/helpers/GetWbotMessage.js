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
exports.GetWbotMessage = void 0;
const GetTicketWbot_1 = __importDefault(require("./GetTicketWbot"));
const AppError_1 = __importDefault(require("../errors/AppError"));
exports.GetWbotMessage = (ticket, messageId) => __awaiter(void 0, void 0, void 0, function* () {
    const wbot = yield GetTicketWbot_1.default(ticket);
    const wbotChat = yield wbot.getChatById(`${ticket.contact.number}@${ticket.isGroup ? "g" : "c"}.us`);
    let limit = 20;
    const fetchWbotMessagesGradually = () => __awaiter(void 0, void 0, void 0, function* () {
        const chatMessages = yield wbotChat.fetchMessages({ limit });
        const msgFound = chatMessages.find(msg => msg.id.id === messageId);
        if (!msgFound && limit < 100) {
            limit += 20;
            return fetchWbotMessagesGradually();
        }
        return msgFound;
    });
    try {
        const msgFound = yield fetchWbotMessagesGradually();
        if (!msgFound) {
            throw new Error("Cannot found message within 100 last messages");
        }
        return msgFound;
    }
    catch (err) {
        throw new AppError_1.default("ERR_FETCH_WAPP_MSG");
    }
});
exports.default = exports.GetWbotMessage;
