"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIO = exports.initIO = void 0;
const socket_io_1 = require("socket.io");
const AppError_1 = __importDefault(require("../errors/AppError"));
const logger_1 = require("../utils/logger");
let io;
exports.initIO = (httpServer) => {
    io = new socket_io_1.Server(httpServer, {
        cors: {
            origin: process.env.FRONTEND_URL
        }
    });
    io.on("connection", socket => {
        logger_1.logger.info("Client Connected");
        socket.on("joinChatBox", (ticketId) => {
            logger_1.logger.info("A client joined a ticket channel");
            socket.join(ticketId);
        });
        socket.on("joinNotification", () => {
            logger_1.logger.info("A client joined notification channel");
            socket.join("notification");
        });
        socket.on("joinTickets", (status) => {
            logger_1.logger.info(`A client joined to ${status} tickets channel.`);
            socket.join(status);
        });
        socket.on("disconnect", () => {
            logger_1.logger.info("Client disconnected");
        });
    });
    return io;
};
exports.getIO = () => {
    if (!io) {
        throw new AppError_1.default("Socket IO not initialized");
    }
    return io;
};
