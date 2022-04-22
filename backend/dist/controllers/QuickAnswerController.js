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
exports.remove = exports.update = exports.show = exports.store = exports.index = void 0;
const Yup = __importStar(require("yup"));
const socket_1 = require("../libs/socket");
const ListQuickAnswerService_1 = __importDefault(require("../services/QuickAnswerService/ListQuickAnswerService"));
const CreateQuickAnswerService_1 = __importDefault(require("../services/QuickAnswerService/CreateQuickAnswerService"));
const ShowQuickAnswerService_1 = __importDefault(require("../services/QuickAnswerService/ShowQuickAnswerService"));
const UpdateQuickAnswerService_1 = __importDefault(require("../services/QuickAnswerService/UpdateQuickAnswerService"));
const DeleteQuickAnswerService_1 = __importDefault(require("../services/QuickAnswerService/DeleteQuickAnswerService"));
const AppError_1 = __importDefault(require("../errors/AppError"));
exports.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchParam, pageNumber } = req.query;
    const { quickAnswers, count, hasMore } = yield ListQuickAnswerService_1.default({
        searchParam,
        pageNumber
    });
    return res.json({ quickAnswers, count, hasMore });
});
exports.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newQuickAnswer = req.body;
    const QuickAnswerSchema = Yup.object().shape({
        shortcut: Yup.string().required(),
        message: Yup.string().required()
    });
    try {
        yield QuickAnswerSchema.validate(newQuickAnswer);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const quickAnswer = yield CreateQuickAnswerService_1.default(Object.assign({}, newQuickAnswer));
    const io = socket_1.getIO();
    io.emit("quickAnswer", {
        action: "create",
        quickAnswer
    });
    return res.status(200).json(quickAnswer);
});
exports.show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quickAnswerId } = req.params;
    const quickAnswer = yield ShowQuickAnswerService_1.default(quickAnswerId);
    return res.status(200).json(quickAnswer);
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const quickAnswerData = req.body;
    const schema = Yup.object().shape({
        shortcut: Yup.string(),
        message: Yup.string()
    });
    try {
        yield schema.validate(quickAnswerData);
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    const { quickAnswerId } = req.params;
    const quickAnswer = yield UpdateQuickAnswerService_1.default({
        quickAnswerData,
        quickAnswerId
    });
    const io = socket_1.getIO();
    io.emit("quickAnswer", {
        action: "update",
        quickAnswer
    });
    return res.status(200).json(quickAnswer);
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { quickAnswerId } = req.params;
    yield DeleteQuickAnswerService_1.default(quickAnswerId);
    const io = socket_1.getIO();
    io.emit("quickAnswer", {
        action: "delete",
        quickAnswerId
    });
    return res.status(200).json({ message: "Quick Answer deleted" });
});
