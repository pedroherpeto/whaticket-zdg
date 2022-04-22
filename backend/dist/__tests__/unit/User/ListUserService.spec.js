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
const User_1 = __importDefault(require("../../../models/User"));
const CreateUserService_1 = __importDefault(require("../../../services/UserServices/CreateUserService"));
const ListUsersService_1 = __importDefault(require("../../../services/UserServices/ListUsersService"));
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
    it("should be able to list users", () => __awaiter(void 0, void 0, void 0, function* () {
        yield CreateUserService_1.default({
            name: faker_1.default.name.findName(),
            email: faker_1.default.internet.email(),
            password: faker_1.default.internet.password()
        });
        const response = yield ListUsersService_1.default({
            pageNumber: 1
        });
        expect(response).toHaveProperty("users");
        expect(response.users[0]).toBeInstanceOf(User_1.default);
    }));
});
