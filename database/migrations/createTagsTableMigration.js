import { Tag } from "../Tags"

export class CreateTagsTableMigration extends Tag {
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
