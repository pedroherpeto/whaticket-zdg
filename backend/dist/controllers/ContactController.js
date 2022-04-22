"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.remove = exports.update = exports.show = exports.store = exports.getContact = exports.index = void 0;
const Yup = __importStar(require("yup"));
const socket_1 = require("../libs/socket");
const ListContactsService_1 = __importDefault(require("../services/ContactServices/ListContactsService"));
const CreateContactService_1 = __importDefault(require("../services/ContactServices/CreateContactService"));
const ShowContactService_1 = __importDefault(require("../services/ContactServices/ShowContactService"));
const UpdateContactService_1 = __importDefault(require("../services/ContactServices/UpdateContactService"));
const DeleteContactService_1 = __importDefault(require("../services/ContactServices/DeleteContactService"));
const CheckNumber_1 = __importDefault(require("../services/WbotServices/CheckNumber"));
const CheckIsValidContact_1 = __importDefault(require("../services/WbotServices/CheckIsValidContact"));
const GetProfilePicUrl_1 = __importDefault(require("../services/WbotServices/GetProfilePicUrl"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const GetContactService_1 = __importDefault(require("../services/ContactServices/GetContactService"));
exports.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchParam, pageNumber } = req.query;
    const { contacts, count, hasMore } = yield ListContactsService_1.default({
        searchParam,
        pageNumber
    });
    return res.json({ contacts, count, hasMore });
});
exports.getContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, number } = req.body;
    const contact = yield GetContactService_1.default({
        name,
        number
    });
    return res.status(200).json(contact);
});
exports.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newContact = req.body;
    newContact.number = newContact.number.replace("-", "").replace(" ", "");
    const schema = Yup.object().shape({
        name: Yup.string().required(),
        number: Yup.string()
            .required()
            .matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
    });
    try {
        yield schema.validate(newContact);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    yield CheckIsValidContact_1.default(newContact.number);
    const validNumber = yield CheckNumber_1.default(newContact.number);
    const profilePicUrl = yield GetProfilePicUrl_1.default(validNumber);
    let name = newContact.name;
    let number = validNumber;
    let email = newContact.email;
    let extraInfo = newContact.extraInfo;
    const contact = yield CreateContactService_1.default({
        name,
        number,
        email,
        extraInfo,
        profilePicUrl
    });
    const io = socket_1.getIO();
    io.emit("contact", {
        action: "create",
        contact
    });
    return res.status(200).json(contact);
});
exports.show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    const contact = yield ShowContactService_1.default(contactId);
    return res.status(200).json(contact);
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contactData = req.body;
    const schema = Yup.object().shape({
        name: Yup.string(),
        number: Yup.string().matches(/^\d+$/, "Invalid number format. Only numbers is allowed.")
    });
    try {
        yield schema.validate(contactData);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    yield CheckIsValidContact_1.default(contactData.number);
    const { contactId } = req.params;
    const contact = yield UpdateContactService_1.default({ contactData, contactId });
    const io = socket_1.getIO();
    io.emit("contact", {
        action: "update",
        contact
    });
    return res.status(200).json(contact);
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contactId } = req.params;
    yield DeleteContactService_1.default(contactId);
    const io = socket_1.getIO();
    io.emit("contact", {
        action: "delete",
        contactId
    });
    return res.status(200).json({ message: "Contact deleted" });
});
