"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SerializeWbotMsgId = (ticket, message) => {
    const serializedMsgId = `${message.fromMe}_${ticket.contact.number}@${ticket.isGroup ? "g" : "c"}.us_${message.id}`;
    return serializedMsgId;
};
exports.default = SerializeWbotMsgId;
