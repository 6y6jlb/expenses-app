export class DBDto {
	#from = ""
	#select = ""
	#join = ""
	#where = ""
	#group = ""
	#order = ""
	#insert = ""
	#values = ""
	#set = ""
	#update = ""
	#delete = ""

	constructor() {}

	/**
	 * @param {string} value
	 */
	set from(value) {
		this.#from = value
	}
	/**
	 * @param {string} value
	 */
	set select(value) {
		this.#select = value
	}
	/**
	 * @param {string} value
	 */
	set join(value) {
		this.#join = value
	}
	/**
	 * @param {string} value
	 */
	set where(value) {
		this.#where = value
	}
	/**
	 * @param {string} value
	 */
	set group(value) {
		this.#group = value
	}
	/**
	 * @param {string} value
	 */
	set order(value) {
		this.#order = value
	}

	/**
	 * @param {string} value
	 */
	set insert(value) {
		this.#insert = value
	}

	/**
	 * @param {string} value
	 */
	set values(value) {
		this.#values = value
	}

	/**
	 * @param {string} value
	 */
	set set(value) {
		this.#set = value
	}

	/**
	 * @param {string} value
	 */
	set update(value) {
		this.#update = value
	}

	/**
	 * @param {string} value
	 */
	set delete(value) {
		this.#delete = value
	}

	/**
	 * @returns {string}
	 * @throws {Error}
	 */
	selectSqlStatement() {
		if (!(this.#select && this.#from)) {
			console.log(this)
			throw new Error("Incorrect db statement")
		}
		return `${this.#select} ${this.#from} ${this.#join} ${this.#where} ${this.#group} ${this.#order};`
	}

	/**
	 * @returns {string}
	 * @throws {Error}
	 */
	insertSqlStatement() {
		if (!(this.#insert && this.#values)) {
			console.log(this)
			throw new Error("Incorrect db statement")
		}
		return `${this.#insert} ${this.#values} ${this.#where};`
	}

	/**
	 * @returns {string}
	 * @throws {Error}
	 */
	updateSqlStatement() {
		if (!(this.#update && this.#set)) {
			console.log(this)
			throw new Error("Incorrect db statement")
		}
		return `${this.#update} ${this.#set} ${this.#where};`
	}

	/**
	 * @returns {string}
	 * @throws {Error}
	 */
	deleteSqlStatement() {
		if (!(this.#delete)) {
			console.log(this)
			throw new Error("Incorrect db statement")
		}
		return `${this.#update} ${this.#where};`
	}
}
