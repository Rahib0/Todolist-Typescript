"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const todo_1 = require("../controllers/todo");
exports.router = express_1.default.Router();
// GET all todos
exports.router.get('/get', todo_1.displayAllTodos);
// POST
exports.router.post('/post', todo_1.createTodo);
// UPDATE
exports.router.put('/update/:id', todo_1.updateTodo);
// DELETE
exports.router.delete("/delete/:id", todo_1.deleteTodo);
//# sourceMappingURL=todos.js.map