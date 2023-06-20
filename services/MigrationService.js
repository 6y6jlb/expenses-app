import { Migration } from "../database/Migration"
import { migrations } from "../database/migrations"

export class MigrationService {
	constructor() {
		this.db = new Migration()
		this.migrations = migrations
	}

	async up() {
		try {
			this.migrations.forEach(async (migrationClass) => {
				const migration = new migrationClass()
				await migration.up()
				if (await this.allowStore(migrationClass.name)) {
					console.log(migrationClass.name)
					await this.db.store({ name: migrationClass.name })
				}
			})
		} catch (error) {
			throw Error("Migrations error: " + error.message)
		}
	}

	async allowStore(name) {
		const result = await this.db.select(name)
		return !!result.length
	}
}
