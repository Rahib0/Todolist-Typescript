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
exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.displayAllTodos = void 0;
const Todo_1 = __importDefault(require("../models/Todo"));
function displayAllTodos(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const show = yield Todo_1.default.everything();
            res.status(200).json(show);
        }
        catch (err) {
            res.status(404).json({ error: err });
        }
    });
}
exports.displayAllTodos = displayAllTodos;
function createTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const show = yield Todo_1.default.create(req.body);
            res.status(200).json(show);
        }
        catch (err) {
            res.status(404).json({ error: err });
        }
    });
}
exports.createTodo = createTodo;
function updateTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todoId = Number(req.params.id);
            const todo = yield Todo_1.default.find(todoId);
            const newTodoData = req.body;
            const show = yield todo.update(newTodoData);
            res.status(200).json(show);
        }
        catch (err) {
            res.status(404).json({ error: err });
        }
    });
}
exports.updateTodo = updateTodo;
function deleteTodo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const todoId = Number(req.params.id);
            const todo = yield Todo_1.default.find(todoId);
            const show = yield todo.destroy();
            res.status(200).json(show);
        }
        catch (err) {
            res.status(404).json({ error: err });
        }
    });
}
exports.deleteTodo = deleteTodo;
//# sourceMappingURL=todo.js.map