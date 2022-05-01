import { Request, Response } from "express"
import Todo from '../models/Todo'

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

export async function displayAllTodos(req: Request, res: Response) {
    try {
		const show: Payload = await Todo.everything();
		res.status(200).json(show);
	} catch (err) {
		res.status(404).json({error: err});
	}
}

export async function createTodo(req: Request, res: Response) {
    try {
        const show: Payload = await Todo.create(req.body);
		res.status(200).json(show);
	} catch (err) {
        res.status(404).json({error: err});
	}
}

export async function updateTodo(req: Request, res: Response) {
    try {
        const todoId: number = Number(req.params.id)
        const todo: Todo = await Todo.find(todoId)
        const newTodoData: TodoPayloadUpdate = req.body
        const show: Payload = await todo.update(newTodoData)
        res.status(200).json(show);
    } catch (err) {
        res.status(404).json({error: err})
    }
}

export async function deleteTodo(req: Request, res: Response) {
    try {
        const todoId: number = Number(req.params.id)
        const todo: Todo = await Todo.find(todoId)
        const show: Payload = await todo.destroy()
        res.status(200).json(show)
    } catch (err) {
        res.status(404).json({error: err})
    }
}

