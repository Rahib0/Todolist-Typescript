import express, { Router, Request, Response } from "express"
import Todo from '../models/Todo'
export const router: Router = express.Router()

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

// GET all todos
router.get('/get', async (req: Request, res: Response) => {
    try {
		const show: Payload = await Todo.everything();
		res.status(200).json(show);
	} catch (err) {
		res.status(404).json({error: err});
	}
})

// POST
router.post('/post', async(req: Request, res:Response) => {
    try {
        const show: Payload = await Todo.create(req.body);
		res.status(200).json(show);
	} catch (err) {
        res.status(404).json({error: err});
	}
})

// UPDATE
router.put('/update/:id', async(req: Request, res: Response) => {
    try {
        const todoId: number = Number(req.params.id)
        const todo: Todo = await Todo.find(todoId)
        const newTodoData: TodoPayloadUpdate = req.body
        const show: Payload = await todo.update(newTodoData)
        res.status(200).json(show);
    } catch (err) {
        res.status(404).json({error: err})
    }
})

// DELETE
router.delete("/delete/:id", async(req: Request, res: Response) => {
    try {
        const todoId: number = Number(req.params.id)
        const todo: Todo = await Todo.find(todoId)
        const show: Payload = await todo.destroy()
        res.status(200).json(show)
    } catch (err) {
        res.status(404).json({error: err})
    }
})