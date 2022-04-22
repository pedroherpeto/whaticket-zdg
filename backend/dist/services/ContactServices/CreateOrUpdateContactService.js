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
const Contact_1 = __importDefault(require("../../models/Contact"));
const CreateOrUpdateContactService = ({ name, number: rawNumber, profilePicUrl, isGroup, email = "", extraInfo = [] }) => __awaiter(void 0, void 0, void 0, function* () {
    const number = isGroup ? rawNumber : rawNumber.replace(/[^0-9]/g, "");
    const io = socket_1.getIO();
    let contact;
    contact = yield Contact_1.default.findOne({ where: { number } });
    if (contact) {
        contact.update({ profilePicUrl });
        io.emit("contact", {
            action: "update",
            contact
        });
    }
    else {
        contact = yield Contact_1.default.create({
            name,
            number,
            profilePicUrl,
            email,
            isGroup,
            extraInfo
        });
        io.emit("contact", {
            action: "create",
            contact
        });
    }
    return contact;
});
exports.default = CreateOrUpdateContactService;
