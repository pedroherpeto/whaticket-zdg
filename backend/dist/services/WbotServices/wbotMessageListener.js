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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = exports.wbotMessageListener = void 0;
exports.handleMsgAck = exports.wbotMessageListener = void 0;
const path_1 = require("path");
const util_1 = require("util");
const fs_1 = require("fs");
const Sentry = __importStar(require("@sentry/node"));
const Message_1 = __importDefault(require("../../models/Message"));
const socket_1 = require("../../libs/socket");
const CreateMessageService_1 = __importDefault(require("../MessageServices/CreateMessageService"));
const logger_1 = require("../../utils/logger");
const CreateOrUpdateContactService_1 = __importDefault(require("../ContactServices/CreateOrUpdateContactService"));
const FindOrCreateTicketService_1 = __importDefault(require("../TicketServices/FindOrCreateTicketService"));
const ShowWhatsAppService_1 = __importDefault(require("../WhatsappService/ShowWhatsAppService"));
const Debounce_1 = require("../../helpers/Debounce");
const UpdateTicketService_1 = __importDefault(require("../TicketServices/UpdateTicketService"));
const CreateContactService_1 = __importDefault(require("../ContactServices/CreateContactService"));
const Mustache_1 = __importDefault(require("../../helpers/Mustache"));
const writeFileAsync = util_1.promisify(fs_1.writeFile);
const verifyContact = (msgContact) => __awaiter(void 0, void 0, void 0, function* () {
try {
    const profilePicUrl = yield msgContact.getProfilePicUrl();
    const contactData = {
        name: msgContact.name || msgContact.pushname || msgContact.id.user,
        number: msgContact.id.user,
        profilePicUrl,
        isGroup: msgContact.isGroup
    };
    const contact = CreateOrUpdateContactService_1.default(contactData);
    return contact;
}
catch (err) {
    const profilePicUrl = "/default-profile.png"; // Foto de perfil padrão
    const contactData = {
        name: msgContact.name || msgContact.pushname || msgContact.id.user,
        number: msgContact.id.user,
        profilePicUrl,
        isGroup: msgContact.isGroup
    };
    const contact = CreateOrUpdateContactService_1.default(contactData);
    return contact;
}
});
const verifyQuotedMessage = (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (!msg.hasQuotedMsg)
        return null;
    const wbotQuotedMsg = yield msg.getQuotedMessage();
    const quotedMsg = yield Message_1.default.findOne({
        where: { id: wbotQuotedMsg.id.id }
    });
    if (!quotedMsg)
        return null;
    return quotedMsg;
});
const verifyMediaMessage = (msg, ticket, contact) => __awaiter(void 0, void 0, void 0, function* () {
    const quotedMsg = yield verifyQuotedMessage(msg);
    const media = yield msg.downloadMedia();
    if (!media) {
        throw new Error("ERR_WAPP_DOWNLOAD_MEDIA");
    }
    let originalFilename = media.filename ? `-${media.filename}` : '';
    const ext = media.mimetype.split("/")[1].split(";")[0];
    media.filename = `${new Date().getTime()}${originalFilename}.${ext}`;
    try {
        yield writeFileAsync(path_1.join(__dirname, "..", "..", "..", "public", media.filename), media.data, "base64");
    }
    catch (err) {
        Sentry.captureException(err);
        logger_1.logger.error(err);
    }
    const messageData = {
        id: msg.id.id,
        ticketId: ticket.id,
        contactId: msg.fromMe ? undefined : contact.id,
        body: msg.body || media.filename,
        fromMe: msg.fromMe,
        read: msg.fromMe,
        mediaUrl: media.filename,
        mediaType: media.mimetype.split("/")[0],
        quotedMsgId: quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id
    };
    yield ticket.update({ lastMessage: msg.body || media.filename });
    const newMessage = yield CreateMessageService_1.default({ messageData });
    return newMessage;
});
const verifyMessage = (msg, ticket, contact) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.type === 'location')
        msg = prepareLocation(msg);
    const quotedMsg = yield verifyQuotedMessage(msg);
    const messageData = {
        id: msg.id.id,
        ticketId: ticket.id,
        contactId: msg.fromMe ? undefined : contact.id,
        body: msg.body,
        fromMe: msg.fromMe,
        mediaType: msg.type,
        read: msg.fromMe,
        quotedMsgId: quotedMsg === null || quotedMsg === void 0 ? void 0 : quotedMsg.id
    };
    yield ticket.update({ lastMessage: msg.type === "location" ? msg.location.description ? "Localization - " + msg.location.description.split('\\n')[0] : "Localization" : msg.body });
    yield CreateMessageService_1.default({ messageData });
});
const prepareLocation = (msg) => {
    let gmapsUrl = "https://maps.google.com/maps?q=" + msg.location.latitude + "%2C" + msg.location.longitude + "&z=17&hl=pt-BR";
    msg.body = "data:image/png;base64," + msg.body + "|" + gmapsUrl;
    msg.body += "|" + (msg.location.description ? msg.location.description : (msg.location.latitude + ", " + msg.location.longitude));
    return msg;
};
const verifyQueue = (wbot, msg, ticket, contact) => __awaiter(void 0, void 0, void 0, function* () {
    const { queues, greetingMessage } = yield ShowWhatsAppService_1.default(wbot.id);
    if (queues.length === 1) {
        yield UpdateTicketService_1.default({
            ticketData: { queueId: queues[0].id },
            ticketId: ticket.id
        });
        return;
    }
    const selectedOption = msg.body;
    const choosenQueue = queues[+selectedOption - 1];
    if (choosenQueue) {
        yield UpdateTicketService_1.default({
            ticketData: { queueId: choosenQueue.id },
            ticketId: ticket.id
        });
        const body = Mustache_1.default(`\u200e${choosenQueue.greetingMessage}`, contact);
        const sentMessage = yield wbot.sendMessage(`${contact.number}@c.us`, body);
        yield verifyMessage(sentMessage, ticket, contact);
    }
    else {
        let options = "";
        queues.forEach((queue, index) => {
            options += `*${index + 1}* - ${queue.name}\n`;
        });
        const body = Mustache_1.default(`\u200e${greetingMessage}\n${options}`, contact);
        const debouncedSentMessage = Debounce_1.debounce(() => __awaiter(void 0, void 0, void 0, function* () {
            const sentMessage = yield wbot.sendMessage(`${contact.number}@c.us`, body);
            verifyMessage(sentMessage, ticket, contact);
        }), 3000, ticket.id);
        debouncedSentMessage();
    }
});
const isValidMsg = (msg) => {
    if (msg.from === "status@broadcast")
        return false;
    if (msg.type === "chat" ||
        msg.type === "audio" ||
        msg.type === "call_log" ||
        msg.type === "ptt" ||
        msg.type === "video" ||
        msg.type === "image" ||
        msg.type === "document" ||
        msg.type === "vcard" ||
        msg.type === "sticker" ||
        msg.type === "e2e_notification" ||
        msg.type === "notification_template" ||
        msg.author != null ||
        msg.type === "location")
        return true;
    return false;
};
const handleMessage = (msg, wbot) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    if (!isValidMsg(msg)) {
        return;
    }
    try {
        let msgContact;
        let groupContact;
        if (msg.fromMe) {
            if (/\u200e/.test(msg.body[0]))
                return;
            if (!msg.hasMedia && msg.type !== "location" && msg.type !== "chat" && msg.type !== "vcard"
            )
                return;
            msgContact = yield wbot.getContactById(msg.to);
        }
        else {
            msgContact = yield msg.getContact();
        }
        const chat = yield msg.getChat();
        if (chat.isGroup) {
            let msgGroupContact;
            if (msg.fromMe) {
                msgGroupContact = yield wbot.getContactById(msg.to);
            }
            else {
                msgGroupContact = yield wbot.getContactById(msg.from);
            }
            groupContact = yield verifyContact(msgGroupContact);
        }
        const whatsapp = yield ShowWhatsAppService_1.default(wbot.id);
        const unreadMessages = msg.fromMe ? 0 : chat.unreadCount;
        const contact = yield verifyContact(msgContact);
        if (unreadMessages === 0 &&
            whatsapp.farewellMessage &&
            Mustache_1.default(whatsapp.farewellMessage, contact) === msg.body)
            return;
        const ticket = yield FindOrCreateTicketService_1.default(contact, wbot.id, unreadMessages, groupContact);
        if (msg.hasMedia) {
            yield verifyMediaMessage(msg, ticket, contact);
        }
        else {
            yield verifyMessage(msg, ticket, contact);
        }
        if (!ticket.queue &&
            !chat.isGroup &&
            !msg.fromMe &&
            !ticket.userId &&
            whatsapp.queues.length >= 1) {
            yield verifyQueue(wbot, msg, ticket, contact);
        }
        if (msg.type === "vcard") {
            try {
                const array = msg.body.split("\n");
                const obj = [];
                let contact = "";
                for (let index = 0; index < array.length; index++) {
                    const v = array[index];
                    const values = v.split(":");
                    for (let ind = 0; ind < values.length; ind++) {
                        if (values[ind].indexOf("+") !== -1) {
                            obj.push({ number: values[ind] });
                        }
                        if (values[ind].indexOf("FN") !== -1) {
                            contact = values[ind + 1];
                        }
                    }
                }
                try {
                    for (var obj_1 = __asyncValues(obj), obj_1_1; obj_1_1 = yield obj_1.next(), !obj_1_1.done;) {
                        const ob = obj_1_1.value;
                        const cont = yield CreateContactService_1.default({
                            name: contact,
                            number: ob.number.replace(/\D/g, "")
                        });
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (obj_1_1 && !obj_1_1.done && (_a = obj_1.return)) yield _a.call(obj_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    catch (err) {
        Sentry.captureException(err);
        logger_1.logger.error(`Error handling whatsapp message: Err: ${err}`);
    }
});
exports.handleMessage = handleMessage;
const handleMsgAck = (msg, ack) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise(r => setTimeout(r, 500));
    const io = socket_1.getIO();
    try {
        const messageToUpdate = yield Message_1.default.findByPk(msg.id.id, {
            include: [
                "contact",
                {
                    model: Message_1.default,
                    as: "quotedMsg",
                    include: ["contact"]
                }
            ]
        });
        if (!messageToUpdate) {
            return;
        }
        yield messageToUpdate.update({ ack });
        io.to(messageToUpdate.ticketId.toString()).emit("appMessage", {
            action: "update",
            message: messageToUpdate
        });
    }
    catch (err) {
        Sentry.captureException(err);
        logger_1.logger.error(`Error handling message ack. Err: ${err}`);
    }
});
exports.handleMsgAck = handleMsgAck;
const wbotMessageListener = (wbot) => {
    wbot.on("message_create", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        handleMessage(msg, wbot);
    }));
    wbot.on("media_uploaded", (msg) => __awaiter(void 0, void 0, void 0, function* () {
        handleMessage(msg, wbot);
    }));
    wbot.on("message_ack", (msg, ack) => __awaiter(void 0, void 0, void 0, function* () {
        handleMsgAck(msg, ack);
    }));
};
exports.wbotMessageListener = wbotMessageListener;
