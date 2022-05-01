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
const config_1 = __importDefault(require("../db_config/config"));
class Todo {
    constructor(data) {
        this.id = data.todo_id;
        this.task = data.task;
        this.isCompleted = data.iscompleted;
    }
    static get everything() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-console
            console.log("Attempting to query database for everything...");
            try {
                const result = yield config_1.default.query(`SELECT * from todos;`);
                const todosData = result.rows.map(r => new Todo(r));
                resolve({ data: todosData });
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected");
                reject(`Error retrieving Todos data: ${err}`);
            }
        }));
    }
    static create(todoData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-console
            console.log("Attempting to query database to insert Todo...");
            try {
                const { task, isCompleted } = todoData;
                const newTodo = yield config_1.default.query("INSERT INTO todos (task, iscompleted) VALUES ($1, $2) RETURNING *;", [task, isCompleted]);
                const result = new Todo(newTodo.rows[0]);
                resolve({ data: result });
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected");
                reject(`Todo could not be created`);
            }
        }));
    }
    static find(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-console
            console.log("Attempting to query database to find Todo...");
            try {
                const todo = yield config_1.default.query("SELECT * FROM todos WHERE todo_id = $1;", [id]);
                const result = new Todo(todo.rows[0]);
                resolve(result);
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected");
                reject(`No such id found`);
            }
        }));
    }
    update(todoData) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-console
            console.log("Attempting to query database to update Todo...");
            try {
                const task = todoData.task || this.task;
                let isCompleted;
                (todoData.isCompleted === true || todoData.isCompleted === false) ? isCompleted = todoData.isCompleted : isCompleted = this.isCompleted;
                const newTodo = yield config_1.default.query("UPDATE todos  SET task = $1, iscompleted = $2 WHERE todo_id = $3 RETURNING *;", [task, isCompleted, this.id]);
                const result = new Todo(newTodo.rows[0]);
                resolve({ data: result });
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected");
                reject(`Todo could not be updated`);
            }
        }));
    }
    get destroy() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-console
            console.log("Attempting to query database to delete Todo...");
            try {
                const result = yield config_1.default.query("DELETE from todos WHERE todo_id = $1 RETURNING *;", [this.id]);
                resolve({ data: result.rows[0] });
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected");
                reject("Todo could not be deleted");
            }
        }));
    }
}
exports.default = Todo;
//# sourceMappingURL=Todo.js.map