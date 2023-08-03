import { Migration } from "../database/Migration"
import { migrations } from "../database/migrations"
import { CreateMigrationsTableMigration } from "../database/migrations/createMigrationsTableMigration"

export class MigrationService {
	constructor() {
		this.db = new Migration()
		this.migrations = migrations
		this.migrationTableCreation = new CreateMigrationsTableMigration()
	}

	async up() {
		try {
			await this.migrationTableCreation.up()

			await Promise.all(
				this.migrations.map(async (migrationClass) => {
					if (await this.allow(migrationClass.name)) {
						const migration = new migrationClass()
						await migration.up()
						await this.db.store({ name: migrationClass.name })
					}
				})
			)

		} catch (error) {
			console.log(error)
			throw Error(`Migrations error: ${error.message}`)
		}
	}

	async allow(name) {
		const result = await this.db.select({ name })
		return !result.length
	}
}
