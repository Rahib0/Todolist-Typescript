"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
// let pool: Pool;
// if (process.env.NODE_ENV === 'production') {
//     pool = new Pool({
//         connectionString: process.env.DATABASE_URL,
//             ssl: {
//                 rejectUnauthorized: false,
//             }
//     })
// } else {
//     pool = new Pool()
// }
const pool = new pg_1.Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: Number(process.env.PGPORT)
});
exports.default = pool;
//# sourceMappingURL=config.js.map