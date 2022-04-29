"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
let pool;
exports.pool = pool;
if (process.env.NODE_ENV === 'production') {
    exports.pool = pool = new pg_1.Pool({
        connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    });
}
else {
    exports.pool = pool = new pg_1.Pool();
}
//# sourceMappingURL=config.js.map