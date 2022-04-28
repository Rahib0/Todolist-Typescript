import express from "express"
import cors from "cors"

// const cors = require("cors");

export const server = express();
server.use(cors());

server.get("/", (req, res) => res.send("Hello World!"));


