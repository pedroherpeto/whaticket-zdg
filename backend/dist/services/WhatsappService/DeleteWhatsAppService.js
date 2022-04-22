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
const Whatsapp_1 = __importDefault(require("../../models/Whatsapp"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const fs = require('fs');
const db = require('../../helpers/Db');

const DeleteWhatsAppService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const whatsapp = yield Whatsapp_1.default.findOne({
        where: { id }
    });
    function delay(t, v) {
        return new Promise(function(resolve) { 
            setTimeout(resolve.bind(null, v), t)
        });
     }
     delay(5000).then(function() {
        const testFolder = './.wwebjs_auth/';
        fs.readdir(testFolder, (err, files) => {
            files.forEach(async file => {
            const sessionId = file.replace(/[^0-9.]/g,"");
            const dir = './.wwebjs_auth/session-bd_' + sessionId;
            const getWpp = await db.getActiveWhatsAppId(sessionId);
            if (getWpp === true){
                console.log('© ZDG - TOKEN mantido para sessão: ' + sessionId);
            }
            else{
                fs.rmdir(dir, { recursive: true, force: true }, (error) => {
                    if (error === null){
                        console.log('© ZDG - TOKEN removido para sessão: ' + sessionId);
                    }
                    else{
                        console.log(error);
                    }
                });
            }
            });
        });
    });
    if (!whatsapp) {
        throw new AppError_1.default("ERR_NO_WAPP_FOUND", 404);
    }
    yield whatsapp.destroy();
});
exports.default = DeleteWhatsAppService;
