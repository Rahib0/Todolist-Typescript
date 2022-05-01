import db from '../db_config/config'

export interface TodoInterface {
    readonly id: number,
    task: string,
    isCompleted: boolean,
    update(todoData: TodoPayloadUpdate): Promise<{ data: Todo }>,
    destroy(): Promise<{ data: Todo }>
}

interface TodoPayload {
    task: string,
    isCompleted: boolean
}

export interface TodoPayloadUpdate {
    task?: string,
    isCompleted?: boolean
}

interface Data {
    todo_id: number,
    task: string,
    iscompleted: boolean
}

export default class Todo implements TodoInterface{
	readonly id: number
	task: string
	isCompleted: boolean

	constructor(data: Data) {
		this.id = data.todo_id
		this.task = data.task
		this.isCompleted = data.iscompleted
	}

	static everything(): Promise<{ data: Todo[] }> {
		return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
			console.log('Attempting to query database for everything...')
			try {
				const result = await db.query('SELECT * from todos;')
				const todosData: Todo[] = result.rows.map(r => new Todo(r))
				resolve({data: todosData})
			} catch (err) {
				// tslint:disable-next-line:no-console
				console.log('query has been rejected')
				reject(`Error retrieving Todos data: ${err}`)
			}
		})
	}

	static create(todoData: TodoPayload): Promise<{data: Todo}> {
		return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
			console.log('Attempting to query database to insert Todo...')
			try {
				const { task, isCompleted } = todoData
				const newTodo = await db.query(
					'INSERT INTO todos (task, iscompleted) VALUES ($1, $2) RETURNING *;',
					[task, isCompleted]
				)
				const result: Todo = new Todo(newTodo.rows[0])
				resolve({data: result})
			} catch (err) {
				// tslint:disable-next-line:no-console
				console.log('query has been rejected')
				reject('Todo could not be created')
			}
		})
	}

	static find(id: number): Promise<Todo>{
		return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
			console.log('Attempting to query database to find Todo...')
			try {
				const todo = await db.query('SELECT * FROM todos WHERE todo_id = $1;', [id])
				const result: Todo = new Todo(todo.rows[0])
				resolve(result)
			} catch (err) {
				// tslint:disable-next-line:no-console
				console.log('query has been rejected')
				reject('No such id found')
			}
		})
	}

	update(todoData: TodoPayloadUpdate): Promise<{data: Todo}> {
		return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
			console.log('Attempting to query database to update Todo...')
			try {
				const task = todoData.task || this.task
				let isCompleted
				(todoData.isCompleted === true || todoData.isCompleted === false) ? isCompleted = todoData.isCompleted : isCompleted = this.isCompleted
				const newTodo = await db.query(
					'UPDATE todos  SET task = $1, iscompleted = $2 WHERE todo_id = $3 RETURNING *;',
					[task, isCompleted, this.id]
				)
				const result: Todo = new Todo(newTodo.rows[0])
				resolve({data: result})
			} catch (err) {
				// tslint:disable-next-line:no-console
				console.log('query has been rejected')
				reject('Todo could not be updated')
			}
		})
	}

	destroy(): Promise<{data: Todo}> {
		return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
			console.log('Attempting to query database to delete Todo...')
			try {
				const deletedTodo = await db.query('DELETE from todos WHERE todo_id = $1 RETURNING *;', [this.id])
				const result: Todo = new Todo(deletedTodo.rows[0])
				resolve({data: result})
			} catch (err) {
				// tslint:disable-next-line:no-console
				console.log('query has been rejected')
				reject('Todo could not be deleted')
			}
		})
	}
}