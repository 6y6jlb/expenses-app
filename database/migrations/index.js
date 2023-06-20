import { CreateExpenseCategoriesTableMigration } from "./createExpenseCategoriesTableMigration";
import { CreateExpenseTableMigration } from "./createExpenseTablesTableMigration";
import { CreateExpenseTagsMigration } from "./createExpenseTagsTableMigration";
import { CreateExpensesTableMigration } from "./createExpensesTableMigration";
import { CreateMigrationsTableMigration } from "./createMigrationsTableMigration";
import { CreateTagsTableMigration } from "./createTagsTableMigration";

export const migrations = [
    CreateMigrationsTableMigration.name,
    CreateExpenseTableMigration.name,
    CreateExpensesTableMigration.name,
    CreateExpenseCategoriesTableMigration.name,
    CreateTagsTableMigration.name,
    CreateExpenseTagsMigration.name
]