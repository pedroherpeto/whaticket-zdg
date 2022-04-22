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
const Yup = __importStar(require("yup"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const ShowUserService_1 = __importDefault(require("./ShowUserService"));
const UpdateUserService = ({ userData, userId }) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield ShowUserService_1.default(userId);
    const schema = Yup.object().shape({
        name: Yup.string().min(2),
        email: Yup.string().email(),
        profile: Yup.string(),
        password: Yup.string()
    });
    const { email, password, profile, name, queueIds = [] } = userData;
    try {
        yield schema.validate({ email, password, profile, name });
    }
    catch (err) {
        throw new AppError_1.default(err.message);
    }
    yield user.update({
        email,
        password,
        profile,
        name
    });
    yield user.$set("queues", queueIds);
    yield user.reload();
    const serializedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        profile: user.profile,
        queues: user.queues
    };
    return serializedUser;
});
exports.default = UpdateUserService;
