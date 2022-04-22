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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const isAuth_1 = __importDefault(require("../middleware/isAuth"));
const TicketController = __importStar(require("../controllers/TicketController"));
const ticketRoutes = express_1.default.Router();
ticketRoutes.get("/tickets", isAuth_1.default, TicketController.index);
ticketRoutes.get("/tickets/:ticketId", isAuth_1.default, TicketController.show);
ticketRoutes.post("/tickets", isAuth_1.default, TicketController.store);
ticketRoutes.put("/tickets/:ticketId", isAuth_1.default, TicketController.update);
ticketRoutes.delete("/tickets/:ticketId", isAuth_1.default, TicketController.remove);
exports.default = ticketRoutes;
