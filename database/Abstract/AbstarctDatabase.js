import Database from "../../services/Database"
import { DBDto } from "../../services/dto/DBDto"

class AbstractDatabase {
	constructor() {
		this.db = Database
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

export default AbstractDatabase
