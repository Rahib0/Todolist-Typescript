import db from '../db_config/config'

interface TodoInterface {
    id: number,
    task: string,
    isCompleted: boolean,
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

    static get everything() {
		return new Promise(async (res, rej) => {
			// tslint:disable-next-line:no-console
            console.log("Attempting to query database...")
            try {
				const result = await db.query(`SELECT * from todos;`);
				const habitsData = result.rows.map(r => new Todo(r));
				res({data: habitsData});
			} catch (err) {
				// tslint:disable-next-line:no-console
                console.log("query has been rejected")
                rej(`Error retrieving habits data: ${err}`);
			}
		});
	}
}