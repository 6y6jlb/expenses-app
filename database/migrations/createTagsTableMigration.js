import Tags from "../Tags"


export class CreateTagsTableMigration extends Tags {
    async up() {
        this.create()
    }

    async down() {
        this.drop()
    }
}