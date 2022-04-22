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
exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const socket_1 = require("../libs/socket");
const CreateQueueService_1 = __importDefault(require("../services/QueueService/CreateQueueService"));
const DeleteQueueService_1 = __importDefault(require("../services/QueueService/DeleteQueueService"));
const ListQueuesService_1 = __importDefault(require("../services/QueueService/ListQueuesService"));
const ShowQueueService_1 = __importDefault(require("../services/QueueService/ShowQueueService"));
const UpdateQueueService_1 = __importDefault(require("../services/QueueService/UpdateQueueService"));
exports.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const queues = yield ListQueuesService_1.default();
    return res.status(200).json(queues);
});
exports.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, color, greetingMessage } = req.body;
    const queue = yield CreateQueueService_1.default({ name, color, greetingMessage });
    const io = socket_1.getIO();
    io.emit("queue", {
        action: "update",
        queue
    });
    return res.status(200).json(queue);
});
exports.show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { queueId } = req.params;
    const queue = yield ShowQueueService_1.default(queueId);
    return res.status(200).json(queue);
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { queueId } = req.params;
    const queue = yield UpdateQueueService_1.default(queueId, req.body);
    const io = socket_1.getIO();
    io.emit("queue", {
        action: "update",
        queue
    });
    return res.status(201).json(queue);
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { queueId } = req.params;
    yield DeleteQueueService_1.default(queueId);
    const io = socket_1.getIO();
    io.emit("queue", {
        action: "delete",
        queueId: +queueId
    });
    return res.status(200).send();
});
