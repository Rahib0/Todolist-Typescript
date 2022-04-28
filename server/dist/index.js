"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const port = process.env.PORT || 3000;
server_1.server.listen(port, () => 
// tslint:disable-next-line:no-console
console.log(`\n Express departing now from http://localhost:${port} \n`));
//# sourceMappingURL=index.js.map