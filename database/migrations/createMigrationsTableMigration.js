import Migration from "../Migration";

export class CreateMigrationsTableMigration extends Migration {
    async up() {
        this.create()
    }

    async down() {
        this.drop()
    }
}