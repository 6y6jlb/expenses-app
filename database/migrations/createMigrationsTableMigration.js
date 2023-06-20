import {Migration} from "../Migration"

export class CreateMigrationsTableMigration extends Migration {
	constructor() {
		super()
	}

	async up() {
		this.create()
	}

	async down() {
		this.drop()
	}
}
