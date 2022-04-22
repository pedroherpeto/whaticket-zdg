"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRefreshToken = exports.createAccessToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../config/auth"));
exports.createAccessToken = (user) => {
    const { secret, expiresIn } = auth_1.default;
    return jsonwebtoken_1.sign({ usarname: user.name, profile: user.profile, id: user.id }, secret, {
        expiresIn
    });
};
exports.createRefreshToken = (user) => {
    const { refreshSecret, refreshExpiresIn } = auth_1.default;
    return jsonwebtoken_1.sign({ id: user.id, tokenVersion: user.tokenVersion }, refreshSecret, {
        expiresIn: refreshExpiresIn
    });
};
