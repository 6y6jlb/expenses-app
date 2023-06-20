import { Database } from "../../services/Database"

export class AbstractDatabase {
	constructor() {
		this.db = new Database()
		this.tableName = undefined
	}

	async create() {
		return new Promise((resolve, reject) => {
			resolve(new Error("This is abstarct method"))
		})
	}

	async select(where) {
		return this.db.select(this.tableName, where)
	}

	async store(params) {
		return this.db.insert(this.tableName, params)
	}

	async update(params, where) {
		return this.db.update(this.tableName, params, where)
	}

	async drop() {
		return this.db.drop(this.tableName)
	}

	async delete(where) {
		return this.db.delete(this.tableName, where)
	}
}
