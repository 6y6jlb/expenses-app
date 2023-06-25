export class DBDto {

	constructor() {
		this.from = ""
		this.select = ""
		this.join = ""
		this.where = ""
		this.group = ""
		this.order = ""
		this.insert = ""
		this.values = ""
		this.set = ""
		this.update = ""
		this.delete = ""
	}

	selectSqlStatement() {
		if (!(this.select && this.from)) {
			throw new Error("Incorrect db statement")
		}
		return `${this.select} ${this.from} ${this.join} ${this.where} ${this.group} ${this.order};`
	}

	insertSqlStatement() {
		if (!(this.insert && this.values)) {
			throw new Error("Incorrect db statement")
		}
		return `${this.insert} ${this.values} ${this.where};`
	}

	updateSqlStatement() {
		if (!(this.update && this.set)) {
			throw new Error("Incorrect db statement")
		}
		return `${this.update} ${this.set} ${this.where};`
	}

	deleteSqlStatement() {
		if (!this.delete) {
			throw new Error("Incorrect db statement")
		}
		return `${this.delete} ${this.where};`
	}
}
