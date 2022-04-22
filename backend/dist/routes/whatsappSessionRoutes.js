"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const WhatsAppSessionController_1 = __importDefault(require("../controllers/WhatsAppSessionController"));
const whatsappSessionRoutes = express_1.Router();
whatsappSessionRoutes.post("/whatsappsession/:whatsappId", isAuth_1.default, WhatsAppSessionController_1.default.store);
whatsappSessionRoutes.put("/whatsappsession/:whatsappId", isAuth_1.default, WhatsAppSessionController_1.default.update);
whatsappSessionRoutes.delete("/whatsappsession/:whatsappId", isAuth_1.default, WhatsAppSessionController_1.default.remove);
exports.default = whatsappSessionRoutes;
