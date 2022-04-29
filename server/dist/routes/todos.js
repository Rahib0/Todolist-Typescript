"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
exports.router = express_1.default.Router();
const todos = [];
// GET
exports.router.get('/get', (req, res) => {
    const payload = {
        data: todos
    };
    res.status(200).json(payload);
});
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