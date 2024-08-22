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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    static addContacts(userId, contacts) {
        return __awaiter(this, void 0, void 0, function* () {
            // Todo: Add contacts to database
        });
    }
    static getUserAddedContacts(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                resolve([
                    7070707070,
                    7070707071,
                    7070707072,
                    7070707073,
                    7070707074,
                    7070707075,
                    7070707076,
                    7070707077,
                    7070707078,
                    7070707079,
                    7070707089,
                ]);
            });
        });
    }
}
exports.User = User;
