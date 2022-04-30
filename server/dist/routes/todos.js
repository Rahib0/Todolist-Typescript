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
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const Todo_1 = __importDefault(require("../models/Todo"));
exports.router = express_1.default.Router();
const todos = [];
// GET
exports.router.get('/get', (req, res) => {
    const payload = {
        data: todos
    };
    res.status(200).json(payload);
});
// GET from db
exports.router.get('/db/get', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const show = yield Todo_1.default.everything;
        res.status(200).json(show);
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
}));
// POST
exports.router.post('/post', (req, res) => {
    try {
        const { task, isCompleted } = req.body;
        const time = Date.now();
        const todo = {
            id: time,
            task,
            isCompleted
        };
        todos.push(todo);
        res.status(201).json(Object.assign({ message: "Todo has been created!" }, todo));
    }
    catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// POST to db
exports.router.post('/db/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const show = yield Todo_1.default.create(req.body);
        res.status(200).json(show);
    }
    catch (err) {
        res.status(404).json({ error: err });
    }
}));
// UPDATE
exports.router.put('/update/:id', (req, res) => {
    try {
        const todoId = Number(req.params.id);
        const todoIndex = todos.findIndex(todo => todo.id === todoId);
        if (todoIndex === -1) {
            throw new Error("Id not found");
        }
        todos[todoIndex] = Object.assign(Object.assign({}, todos[todoIndex]), req.body);
        res.status(200).json(Object.assign({ message: "Todo has been updated!" }, todos[todoIndex]));
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
// UPDATE to db
exports.router.put('/db/update/:id', (req, res) => {
    try {
        const todoId = Number(req.params.id);
    }
    catch (err) {
    }
});
// DELETE
exports.router.delete("/delete/:id", (req, res) => {
    try {
        const todoId = Number(req.params.id);
        const todoIndex = todos.findIndex(todo => todo.id === todoId);
        if (todoIndex === -1) {
            throw new Error("Id not found");
        }
        const removed = todos[todoIndex];
        todos.splice(todoIndex, 1);
        res.status(200).json(Object.assign({ message: "Todo has been deleted!" }, removed));
    }
    catch (err) {
        res.status(404).json({ error: err.message });
    }
});
//# sourceMappingURL=todos.js.map