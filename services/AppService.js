import { MigrationService } from "./MigrationService"

class AppService {
	constructor() {
		this.migrationService = new MigrationService()
	}

	async init() {
		try {
			await this.migrationService.up()
			
		} catch (error) {
			throw Error(`Init error: ${error.message}`)
		}
	}

}

export default new AppService()
