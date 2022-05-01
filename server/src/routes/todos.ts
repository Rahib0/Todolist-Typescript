import express, { Router, Request, Response } from "express"
import Todo from '../models/Todo'
export const router: Router = express.Router()

const todos: TodoInterface[] = []

interface Payload {
    data: TodoInterface[] | TodoInterface
}
interface TodoInterface {
    id: number,
    task: string,
    isCompleted: boolean
}

interface TodoPayloadUpdate {
    task?: string,
    isCompleted?: boolean
}

// GET from db
router.get('/db/get', async (req: Request, res: Response) => {
    try {
		const show: Payload = await Todo.everything;
		res.status(200).json(show);
	} catch (err) {
		res.status(404).json({error: err.message});
	}
})

// POST to db
router.post('/db/post', async(req: Request, res:Response) => {
    try {
        const show: Payload = await Todo.create(req.body);
		res.status(200).json(show);
	} catch (err) {
        res.status(404).json({error: err});
	}
})


// UPDATE to db
router.put('/db/update/:id', async(req: Request, res: Response) => {
    try {
        const todoId: number = Number(req.params.id)
        const todo: Todo = await Todo.find(todoId)
        const newTodoData: TodoPayloadUpdate = req.body
        const show = await todo.update(newTodoData)
        res.status(200).json(show);
    } catch (err) {
        res.status(404).json({error: err})
    }
})

// DELETE from db
router.delete("/db/delete/:id", async(req: Request, res: Response) => {
    try {
        const todoId: number = Number(req.params.id)
        const todo: Todo = await Todo.find(todoId)
        const show = await todo.destroy
        res.status(200).json({ message: "Todo has been deleted!", ...show})
    } catch (err) {
        res.status(404).json({error: err})
    }
})


// GET
router.get('/get', (req: Request, res: Response) => {
    const payload: Payload = {
        data: todos
    }
    res.status(200).json(payload)
})

// POST
router.post('/post', (req: Request, res:Response) => {
    try {
        const { task, isCompleted } = req.body
        const time = Date.now()
        const todo: TodoInterface = {
            id: time,
            task,
            isCompleted
        }
        todos.push(todo)
        res.status(201).json({ message: "Todo has been created!", ...todo })
    } catch (err) {
        res.status(400).json({error: err.message})
    }
})

// UPDATE
router.put('/update/:id', (req: Request, res: Response) => {
    try {
        const todoId: number = Number(req.params.id)
        const todoIndex = todos.findIndex(todo => todo.id === todoId)
        if (todoIndex === -1) { throw new Error("Id not found") }
        todos[todoIndex] = {
            ...todos[todoIndex],
            ...req.body
        }
        res.status(200).json({ message: "Todo has been updated!", ...todos[todoIndex] })
    } catch (err) {
        res.status(404).json({error: err.message})
    }
} )

// DELETE
router.delete("/delete/:id", (req: Request, res: Response) => {
    try {
        const todoId: number = Number(req.params.id)
        const todoIndex = todos.findIndex(todo => todo.id === todoId)
        if (todoIndex === -1) { throw new Error("Id not found") }
        const removed = todos[todoIndex]
        todos.splice(todoIndex, 1)
        res.status(200).json({ message: "Todo has been deleted!", ...removed })
    } catch (err) {
        res.status(404).json({error: err.message})
    }
})