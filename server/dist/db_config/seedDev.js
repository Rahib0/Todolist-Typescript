"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./config");
const fs_1 = __importDefault(require("fs"));
const seeds = fs_1.default.readFileSync(__dirname + '../../_seeds.sql').toString();
// tslint:disable-next-line:no-console
config_1.pool.query(seeds, () => console.log('Dev database seeded'));
//# sourceMappingURL=seedDev.js.map