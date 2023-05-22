export class DBDto {
	#from = ""
	#select = ""
	#join = ""
	#where = ""
	#group = ""
	#order = ""

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

	toSql() {
		if (!(this.#select && this.#from)) {
			console.log(this)
			throw new Error("Incorrect db statement")
		}
		return this.#select + this.#from + this.#join + this.#where + this.#group + this.#order
	}
}
