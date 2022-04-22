"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mustache_1 = __importDefault(require("mustache"));
exports.default = (body, contact) => {
    const view = {
        name: contact ? contact.name : ""
    };
    return mustache_1.default.render(body, view);
};
