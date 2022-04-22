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
const faker_1 = __importDefault(require("faker"));
const AppError_1 = __importDefault(require("../../../errors/AppError"));
const CreateUserService_1 = __importDefault(require("../../../services/UserServices/CreateUserService"));
const DeleteUserService_1 = __importDefault(require("../../../services/UserServices/DeleteUserService"));
const database_1 = require("../../utils/database");
describe("User", () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.truncate();
    }));
    afterEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.truncate();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.disconnect();
    }));
    it("should be delete a existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = yield CreateUserService_1.default({
            name: faker_1.default.name.findName(),
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password()
        });
        expect(DeleteUserService_1.default(id)).resolves.not.toThrow();
    }));
    it("to throw an error if tries to delete a non existing user", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(DeleteUserService_1.default(faker_1.default.random.number())).rejects.toBeInstanceOf(AppError_1.default);
    }));
});
