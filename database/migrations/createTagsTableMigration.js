import { Tag } from "../Tags"

export class CreateTagsTableMigration extends Tag {
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
