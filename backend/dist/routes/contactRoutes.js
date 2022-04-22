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
const ContactController = __importStar(require("../controllers/ContactController"));
const ImportPhoneContactsController = __importStar(require("../controllers/ImportPhoneContactsController"));
const contactRoutes = express_1.default.Router();
contactRoutes.post("/contacts/import", isAuth_1.default, ImportPhoneContactsController.store);
contactRoutes.get("/contacts", isAuth_1.default, ContactController.index);
contactRoutes.get("/contacts/:contactId", isAuth_1.default, ContactController.show);
contactRoutes.post("/contacts", isAuth_1.default, ContactController.store);
contactRoutes.post("/contact", isAuth_1.default, ContactController.getContact);
contactRoutes.put("/contacts/:contactId", isAuth_1.default, ContactController.update);
contactRoutes.delete("/contacts/:contactId", isAuth_1.default, ContactController.remove);
exports.default = contactRoutes;
