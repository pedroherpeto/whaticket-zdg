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
Object.defineProperty(exports, "__esModule", { value: true });
const Sentry = __importStar(require("@sentry/node"));
const socket_1 = require("../../libs/socket");
const logger_1 = require("../../utils/logger");
const StartWhatsAppSession_1 = require("./StartWhatsAppSession");
const wbotMonitor = (wbot, whatsapp) => __awaiter(void 0, void 0, void 0, function* () {
    const io = socket_1.getIO();
    const sessionName = whatsapp.name;
    try {
        wbot.on("change_state", (newState) => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.logger.info(`Monitor session: ${sessionName}, ${newState}`);
            try {
                yield whatsapp.update({ status: newState });
            }
            catch (err) {
                Sentry.captureException(err);
                logger_1.logger.error(err);
            }
            io.emit("whatsappSession", {
                action: "update",
                session: whatsapp
            });
        }));
        wbot.on("change_battery", (batteryInfo) => __awaiter(void 0, void 0, void 0, function* () {
            const { battery, plugged } = batteryInfo;
            logger_1.logger.info(`Battery session: ${sessionName} ${battery}% - Charging? ${plugged}`);
            try {
                yield whatsapp.update({ battery, plugged });
            }
            catch (err) {
                Sentry.captureException(err);
                logger_1.logger.error(err);
            }
            io.emit("whatsappSession", {
                action: "update",
                session: whatsapp
            });
        }));
        wbot.on("disconnected", (reason) => __awaiter(void 0, void 0, void 0, function* () {
            logger_1.logger.info(`Disconnected session: ${sessionName}, reason: ${reason}`);
            try {
                yield whatsapp.update({ status: "OPENING", session: "" });
            }
            catch (err) {
                Sentry.captureException(err);
                logger_1.logger.error(err);
            }
            io.emit("whatsappSession", {
                action: "update",
                session: whatsapp
            });
            setTimeout(() => StartWhatsAppSession_1.StartWhatsAppSession(whatsapp), 2000);
        }));
    }
    catch (err) {
        Sentry.captureException(err);
        logger_1.logger.error(err);
    }
});
exports.default = wbotMonitor;
