"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
exports.server = (0, express_1.default)();
exports.server.use(express_1.default.json());
exports.server.use((0, cors_1.default)());
const todos_1 = require("./routes/todos");
exports.server.use("/todo", todos_1.router);
exports.server.get("/", (req, res) => res.send("Hello World!"));
//# sourceMappingURL=server.js.map