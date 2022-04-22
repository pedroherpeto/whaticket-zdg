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
const Contact_1 = __importDefault(require("../../models/Contact"));
const CreateContactService = ({ name, number, email = "", extraInfo = [] }) => __awaiter(void 0, void 0, void 0, function* () {
    const numberExists = yield Contact_1.default.findOne({
        where: { number }
    });
    if (numberExists) {
        throw new AppError_1.default("ERR_DUPLICATED_CONTACT");
    }
    const contact = yield Contact_1.default.create({
        name,
        number,
        email,
        extraInfo
    }, {
        include: ["extraInfo"]
    });
    return contact;
});
exports.default = CreateContactService;
