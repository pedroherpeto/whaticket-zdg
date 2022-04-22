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
exports.removeWbot = exports.getWbot = exports.initWbot = void 0;
const qrcode_terminal_1 = __importDefault(require("qrcode-terminal"));
const whatsapp_web_js_1 = require("whatsapp-web.js");
const socket_1 = require("./socket");
const AppError_1 = __importDefault(require("../errors/AppError"));
const logger_1 = require("../utils/logger");
const wbotMessageListener_1 = require("../services/WbotServices/wbotMessageListener");
const sessions = [];

const syncUnreadMessages = (wbot) => __awaiter(void 0, void 0, void 0, function* () {
    const chats = yield wbot.getChats();
    /* eslint-disable no-restricted-syntax */
    /* eslint-disable no-await-in-loop */
    for (const chat of chats) {
        if (chat.unreadCount > 0) {
            const unreadMessages = yield chat.fetchMessages({
                limit: chat.unreadCount
            });
            for (const msg of unreadMessages) {
                yield wbotMessageListener_1.handleMessage(msg, wbot);
            }
            yield chat.sendSeen();
        }
    }
});

exports.initWbot = (whatsapp) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        try {
            const io = socket_1.getIO();
            const sessionName = whatsapp.name;
            let sessionCfg;
            if (whatsapp && whatsapp.session) {
                sessionCfg = JSON.parse(whatsapp.session);
            }
            const wbot = new whatsapp_web_js_1.Client({
                session: sessionCfg,
                authStrategy: new whatsapp_web_js_1.LocalAuth({ clientId: 'bd_' + whatsapp.id }),
                puppeteer: {
                    //          headless: false,
                    args: ['--no-sandbox', '--disable-setuid-sandbox'],
                    executablePath: process.env.CHROME_BIN || undefined
                },
            });
            wbot.initialize();
            wbot.on("qr", (qr) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info("Session:", sessionName);
                qrcode_terminal_1.default.generate(qr, { small: true });
                yield whatsapp.update({ qrcode: qr, status: "qrcode", retries: 0 });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
            }));
            wbot.on("authenticated", (session) => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session: ${sessionName} AUTHENTICATED`);
                //        await whatsapp.update({
                //          session: JSON.stringify(session)
                //        });
            }));
            wbot.on("auth_failure", (msg) => __awaiter(void 0, void 0, void 0, function* () {
                console.error(`Session: ${sessionName} AUTHENTICATION FAILURE! Reason: ${msg}`);
                if (whatsapp.retries > 1) {
                    yield whatsapp.update({ session: "", retries: 0 });
                }
                const retry = whatsapp.retries;
                yield whatsapp.update({
                    status: "DISCONNECTED",
                    retries: retry + 1
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                reject(new Error("Error starting whatsapp session."));
            }));
            wbot.on("ready", () => __awaiter(void 0, void 0, void 0, function* () {
                logger_1.logger.info(`Session: ${sessionName} READY`);
                yield whatsapp.update({
                    status: "CONNECTED",
                    qrcode: "",
                    retries: 0
                });
                io.emit("whatsappSession", {
                    action: "update",
                    session: whatsapp
                });
                const sessionIndex = sessions.findIndex(s => s.id === whatsapp.id);
                if (sessionIndex === -1) {
                    wbot.id = whatsapp.id;
                    sessions.push(wbot);
                }
                wbot.sendPresenceAvailable();
                yield syncUnreadMessages(wbot);
                resolve(wbot);
            }));
        }
        catch (err) {
            logger_1.logger.error(err);
        }
    });
});
exports.getWbot = (whatsappId) => {
    const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
    if (sessionIndex === -1) {
        throw new AppError_1.default("ERR_WAPP_NOT_INITIALIZED");
    }
    return sessions[sessionIndex];
};
exports.removeWbot = (whatsappId) => {
    try {
        const sessionIndex = sessions.findIndex(s => s.id === whatsappId);
        if (sessionIndex !== -1) {
            sessions[sessionIndex].destroy();
            sessions.splice(sessionIndex, 1);
        }
    }
    catch (err) {
        logger_1.logger.error(err);
    }
};
