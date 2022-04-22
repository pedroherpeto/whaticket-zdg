"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const User_1 = __importDefault(require("./User"));
const UserQueue_1 = __importDefault(require("./UserQueue"));
const Whatsapp_1 = __importDefault(require("./Whatsapp"));
const WhatsappQueue_1 = __importDefault(require("./WhatsappQueue"));
let Queue = class Queue extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Queue.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Queue.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Queue.prototype, "color", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Queue.prototype, "greetingMessage", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Queue.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Queue.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Whatsapp_1.default, () => WhatsappQueue_1.default),
    __metadata("design:type", Array)
], Queue.prototype, "whatsapps", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => User_1.default, () => UserQueue_1.default),
    __metadata("design:type", Array)
], Queue.prototype, "users", void 0);
Queue = __decorate([
    sequelize_typescript_1.Table
], Queue);
exports.default = Queue;
