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
const Queue_1 = __importDefault(require("./Queue"));
const Ticket_1 = __importDefault(require("./Ticket"));
const WhatsappQueue_1 = __importDefault(require("./WhatsappQueue"));
let Whatsapp = class Whatsapp extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.PrimaryKey,
    sequelize_typescript_1.AutoIncrement,
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Whatsapp.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Whatsapp.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Whatsapp.prototype, "session", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Whatsapp.prototype, "qrcode", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Whatsapp.prototype, "status", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Whatsapp.prototype, "battery", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Whatsapp.prototype, "plugged", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Whatsapp.prototype, "retries", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Whatsapp.prototype, "greetingMessage", void 0);
__decorate([
    sequelize_typescript_1.Column(sequelize_typescript_1.DataType.TEXT),
    __metadata("design:type", String)
], Whatsapp.prototype, "farewellMessage", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.AllowNull,
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Whatsapp.prototype, "isDefault", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    __metadata("design:type", Date)
], Whatsapp.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    __metadata("design:type", Date)
], Whatsapp.prototype, "updatedAt", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => Ticket_1.default),
    __metadata("design:type", Array)
], Whatsapp.prototype, "tickets", void 0);
__decorate([
    sequelize_typescript_1.BelongsToMany(() => Queue_1.default, () => WhatsappQueue_1.default),
    __metadata("design:type", Array)
], Whatsapp.prototype, "queues", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => WhatsappQueue_1.default),
    __metadata("design:type", Array)
], Whatsapp.prototype, "whatsappQueues", void 0);
Whatsapp = __decorate([
    sequelize_typescript_1.Table
], Whatsapp);
exports.default = Whatsapp;
