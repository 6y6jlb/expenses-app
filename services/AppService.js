import { MigrationService } from "./MigrationService"

class AppService {
	#loaded;
	constructor() {
		this.#loaded = false
		this.migrationService = new MigrationService()
	}

	async init() {
		try {
			await this.migrationService.up()
		} catch (error) {
			throw Error("Init error: " + error.message)
		}
		this.#loaded = true
	}

	get loaded() {
		return this.#loaded
	}
}

export default new AppService()
