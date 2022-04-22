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
const GetDefaultWhatsApp_1 = __importDefault(require("../../helpers/GetDefaultWhatsApp"));
const wbot_1 = require("../../libs/wbot");
const Contact_1 = __importDefault(require("../../models/Contact"));
const logger_1 = require("../../utils/logger");
const ImportContactsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const defaultWhatsapp = yield GetDefaultWhatsApp_1.default();
    const wbot = wbot_1.getWbot(defaultWhatsapp.id);
    let phoneContacts;
    try {
        phoneContacts = yield wbot.getContacts();
    }
    catch (err) {
        logger_1.logger.error(`Could not get whatsapp contacts from phone. Err: ${err}`);
    }
    if (phoneContacts) {
        yield Promise.all(phoneContacts.map(({ number, name }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!number) {
                return null;
            }
            if (!name) {
                name = number;
            }
            const numberExists = yield Contact_1.default.findOne({
                where: { number }
            });
            if (numberExists)
                return null;
            return Contact_1.default.create({ number, name });
        })));
    }
});
exports.default = ImportContactsService;
