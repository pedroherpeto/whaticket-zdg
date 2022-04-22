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
const CheckSettings_1 = __importDefault(require("../helpers/CheckSettings"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const CreateUserService_1 = __importDefault(require("../services/UserServices/CreateUserService"));
const ListUsersService_1 = __importDefault(require("../services/UserServices/ListUsersService"));
const UpdateUserService_1 = __importDefault(require("../services/UserServices/UpdateUserService"));
const ShowUserService_1 = __importDefault(require("../services/UserServices/ShowUserService"));
const DeleteUserService_1 = __importDefault(require("../services/UserServices/DeleteUserService"));
exports.index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchParam, pageNumber } = req.query;
    const { users, count, hasMore } = yield ListUsersService_1.default({
        searchParam,
        pageNumber
    });
    return res.json({ users, count, hasMore });
});
exports.store = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, name, profile, queueIds } = req.body;
    if (req.url === "/signup" &&
        (yield CheckSettings_1.default("userCreation")) === "disabled") {
        throw new AppError_1.default("ERR_USER_CREATION_DISABLED", 403);
    }
    else if (req.url !== "/signup" && req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    const user = yield CreateUserService_1.default({
        email,
        password,
        name,
        profile,
        queueIds
    });
    const io = socket_1.getIO();
    io.emit("user", {
        action: "create",
        user
    });
    return res.status(200).json(user);
});
exports.show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const user = yield ShowUserService_1.default(userId);
    return res.status(200).json(user);
});
exports.update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    const { userId } = req.params;
    const userData = req.body;
    const user = yield UpdateUserService_1.default({ userData, userId });
    const io = socket_1.getIO();
    io.emit("user", {
        action: "update",
        user
    });
    return res.status(200).json(user);
});
exports.remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    if (req.user.profile !== "admin") {
        throw new AppError_1.default("ERR_NO_PERMISSION", 403);
    }
    yield DeleteUserService_1.default(userId);
    const io = socket_1.getIO();
    io.emit("user", {
        action: "delete",
        userId
    });
    return res.status(200).json({ message: "User deleted" });
});
