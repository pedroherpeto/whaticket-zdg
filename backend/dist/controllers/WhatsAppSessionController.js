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
const wbot_1 = require("../libs/wbot");
const ShowWhatsAppService_1 = __importDefault(require("../services/WhatsappService/ShowWhatsAppService"));
const StartWhatsAppSession_1 = require("../services/WbotServices/StartWhatsAppSession");
const UpdateWhatsAppService_1 = __importDefault(require("../services/WhatsappService/UpdateWhatsAppService"));
const store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsappId } = req.params;
    const whatsapp = yield ShowWhatsAppService_1.default(whatsappId);
    StartWhatsAppSession_1.StartWhatsAppSession(whatsapp);
    return res.status(200).json({ message: "Starting session." });
});
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsappId } = req.params;
    const { whatsapp } = yield UpdateWhatsAppService_1.default({
        whatsappId,
        whatsappData: { session: "" }
    });
    StartWhatsAppSession_1.StartWhatsAppSession(whatsapp);
    return res.status(200).json({ message: "Starting session." });
});
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { whatsappId } = req.params;
    const whatsapp = yield ShowWhatsAppService_1.default(whatsappId);
    const wbot = wbot_1.getWbot(whatsapp.id);
    wbot.logout();
    return res.status(200).json({ message: "Session disconnected." });
});
exports.default = { store, remove, update };
