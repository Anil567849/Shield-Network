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
exports.Handle = void 0;
const Saviours_1 = require("./Saviours");
const User_1 = require("../db/User");
const twilio = require("twilio");
const myNumber = 552120420682;
class Handle {
    constructor() {
        this.near = new Saviours_1.Saviours;
        this.contacts = null;
        this.interval = null;
        this.location = null;
        // this.client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
        this.client = null;
    }
    saveMe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, location } = req.body;
            if (this.location == null) {
                this.location = location;
                // fetch nearest contacts of people [police, army, politicians, family, people]
                if (this.contacts === null) {
                    const nearestContacts = yield this.near.getNearestContacts(userId, location);
                    if (nearestContacts.length > 0) {
                        this.contacts = nearestContacts;
                        this.broadcastMessage();
                    }
                    else {
                        // do something if no nearest contact found 
                    }
                }
                else {
                    this.broadcastMessage();
                }
            }
            else {
                // check is location change
                if (this.isLocationChange(location)) {
                    this.location = location;
                    const nearestContacts = this.near.getNearestContacts(userId, location);
                    if (nearestContacts.length > 0) {
                        // add more new loaction contacts
                        nearestContacts.forEach((contact, index) => {
                            var _a;
                            (_a = this.contacts) === null || _a === void 0 ? void 0 : _a.push(contact);
                        });
                        this.broadcastMessage();
                    }
                    else {
                        // do something if no nearest contact found 
                    }
                }
            }
            res.send('all people are informed');
        });
    }
    broadcastMessage() {
        if (this.interval) { // if user's location change then first clear old data and then send new data
            clearInterval(this.interval);
        }
        // @ts-ignore 
        this.contacts.forEach((contact, index) => __awaiter(this, void 0, void 0, function* () {
            // send victim's location to each contact [whatsapp, text msg]
            // await this.sendMessage(contact);
            console.log(contact);
        }));
        this.interval = setInterval(() => {
            // @ts-ignore 
            this.contacts.forEach((contact, index) => __awaiter(this, void 0, void 0, function* () {
                // send victim's location to each contact [whatsapp, text msg]
                // await this.sendMessage(contact);
                console.log(contact);
            }));
        }, 10000); // run after each 10 seconds
    }
    sendMessage(contact_1) {
        return __awaiter(this, arguments, void 0, function* (contact, retry = 3) {
            if (retry < 0) {
                console.log('admin check! message is not working');
                return;
            }
            try {
                const message = yield this.client.messages.create({
                    body: `Save me! My location is ${this.location}`, // convert lat long to actual place's name
                    from: `whatsapp:+${myNumber}`,
                    to: `whatsapp:+${contact}`,
                });
            }
            catch (error) {
                yield this.sendMessage(contact, retry--);
            }
        });
    }
    isLocationChange(location) {
        var _a, _b;
        const a = location.lat != ((_a = this.location) === null || _a === void 0 ? void 0 : _a.lat);
        const b = location.long != ((_b = this.location) === null || _b === void 0 ? void 0 : _b.long);
        if (!a || !b) {
            return true;
        }
        return false;
    }
    addSaviour(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId, contacts } = req.body;
            // add user's saviour's contact/s to database
            yield User_1.User.addContacts(userId, contacts);
            res.send("contact/s added");
        });
    }
}
exports.Handle = Handle;
