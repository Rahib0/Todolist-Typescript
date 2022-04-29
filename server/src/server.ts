import express, { Express, Request, Response } from "express"
import cors from "cors"
import 'dotenv/config'

export const server: Express = express();
server.use(express.json())
server.use(cors());

import { router as todoRoutes } from "./routes/todos"

server.use("/todo", todoRoutes)

server.get("/", (req: Request, res: Response) => res.send("Hello World!"));


