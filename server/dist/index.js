"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 8000;
const cors_1 = __importDefault(require("cors"));
const Manager_1 = require("./manager/Manager");
const Manager_2 = require("./manager/admin/Manager");
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
const handle = new Manager_1.Handle();
app.post("/api/add-saviour", (req, res) => {
    handle.addSaviour(req, res);
});
app.post("/api/save-me", (req, res) => {
    handle.saveMe(req, res);
});
const adminManager = new Manager_2.Manager();
app.post("/admin/api/add-saviour", (req, res) => {
    adminManager.addSaviour(req, res);
});
app.listen(PORT, () => {
    console.log("listening to port: ", PORT);
});
