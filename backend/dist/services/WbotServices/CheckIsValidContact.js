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
const GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
const wbot_1 = require("../../libs/wbot");
const CheckIsValidContact = (number) => __awaiter(void 0, void 0, void 0, function* () {
    const defaultWhatsapp = yield GetDefaultWhatsApp_1.default();
    const wbot = wbot_1.getWbot(defaultWhatsapp.id);
    try {
        const isValidNumber = yield wbot.isRegisteredUser(`${number}@c.us`);
        if (!isValidNumber) {
            throw new AppError_1.default("invalidNumber");
        }
    }
    catch (err) {
        if (err.message === "invalidNumber") {
            throw new AppError_1.default("ERR_WAPP_INVALID_CONTACT");
        }
        throw new AppError_1.default("ERR_WAPP_CHECK_CONTACT");
    }
});
exports.default = CheckIsValidContact;
