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
        return new Promise((res, rej) => __awaiter(this, void 0, void 0, function* () {
            // tslint:disable-next-line:no-console
            console.log("Attempting to query database...");
            try {
                const result = yield config_1.default.query(`SELECT * from todos;`);
                const habitsData = result.rows.map(r => new Todo(r));
                res({ data: habitsData });
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected");
                rej(`Error retrieving habits data: ${err}`);
            }
        }));
    }
}
exports.default = Todo;
//# sourceMappingURL=Todo.js.map