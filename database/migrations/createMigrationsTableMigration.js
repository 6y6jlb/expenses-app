import {Migration} from "../Migration"

export class CreateMigrationsTableMigration extends Migration {
	constructor() {
		super()
	}

	async up() {
		await this.create()
	}

	async down() {
		await this.drop()
	}
}
