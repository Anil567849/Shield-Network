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
exports.Saviours = void 0;
const User_1 = require("../db/User");
const Admin_1 = require("../db/Admin");
class Saviours {
    getNearestContacts(userId, location) {
        return __awaiter(this, void 0, void 0, function* () {
            // Todo: get nearest contacts from database
            const a = yield Admin_1.Admin.getNearestContacts(location);
            // Todo: get user's added contacts from database
            const b = yield User_1.User.getUserAddedContacts(userId);
            const c = a.concat(b);
            return c;
        });
    }
}
exports.Saviours = Saviours;
