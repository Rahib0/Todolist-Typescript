import db from '../db_config/config'

interface TodoInterface extends TodoPayload {
    isCompleted: boolean,
}

interface TodoPayload {
    task: string,
    isCompleted: boolean
}

interface TodoPayloadUpdate {
    task?: string,
    isCompleted?: boolean
}

interface Data {
    todo_id: number,
    task: string,
    iscompleted: boolean
}

export default class Todo implements TodoInterface {
    id: number
    task: string
    isCompleted: boolean

    constructor(data: Data) {
        this.id = data.todo_id;
        this.task = data.task;
        this.isCompleted = data.iscompleted;
    }

    static get everything(): Promise<{ data: Todo[]} | string> {
		return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
            console.log("Attempting to query database for everything...")
            try {
				const result = await db.query(`SELECT * from todos;`);
				const todosData: Todo[] = result.rows.map(r => new Todo(r));
				resolve({data: todosData});
			} catch (err) {
				// tslint:disable-next-line:no-console
                console.log("query has been rejected")
                reject(`Error retrieving habits data: ${err}`);
			}
		});
	}

    static create(todoData: TodoPayload): Promise<Todo | string> {
		return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
            console.log("Attempting to query database to insert Todo...")
            try {
                const { task, isCompleted } = todoData;
				const newTodo = await db.query(
					"INSERT INTO todos (task, iscompleted) VALUES ($1, $2) RETURNING *;",
					[task, isCompleted]
				);
				const result: Todo = new Todo(newTodo.rows[0]);
				resolve(result);
			} catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected")
				reject(`Habit could not be created`);
			}
		});
	}

    // WORK ON THIS 
    // static find(id){
    //     return new Promise(async(resolve, reject) => {
    //                 // tslint:disable-next-line:no-console
    //                 console.log("Attempting to query database to update Todo...")
    //     })
    // }

    update(todoData: TodoPayloadUpdate): Promise<Todo | string> {
        return new Promise(async (resolve, reject) => {
			// tslint:disable-next-line:no-console
            console.log("Attempting to query database to update Todo...")
            try {
                // const { task, isCompleted } = todoData;
				const task = todoData.task || this.task
                const isCompleted = todoData.isCompleted || this.isCompleted
                // tslint:disable-next-line:no-console
                console.log(task, isCompleted)
                const newTodo = await db.query(
					"UPDATE todos (task, iscompleted) VALUES ($1, $2) WHERE todo_id = $3 RETURNING *;",
					[task, isCompleted, this.id]
				);
				const result: Todo = new Todo(newTodo.rows[0]);
				resolve(result);
			} catch (err) {
                // tslint:disable-next-line:no-console
                console.log("query has been rejected")
				reject(`Habit could not be created`);
			}
		});
    }


}