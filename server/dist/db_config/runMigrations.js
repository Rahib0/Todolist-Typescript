"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const fs_1 = __importDefault(require("fs"));
require("dotenv/config");
const seeds = fs_1.default.readFileSync(__dirname + '/_migrations.sql').toString();
// tslint:disable-next-line:no-console
config_1.default.query(seeds, () => console.log('database has been migrated!'));
//# sourceMappingURL=runMigrations.js.map