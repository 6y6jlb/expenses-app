import { CreateExpenseCategoriesTableMigration } from "./createExpenseCategoriesTableMigration";
import { CreateExpenseTableMigration } from "./createExpenseTablesTableMigration";
import { CreateExpenseTagsMigration } from "./createExpenseTagsTableMigration";
import { CreateExpensesTableMigration } from "./createExpensesTableMigration";
import { CreateMigrationsTableMigration } from "./createMigrationsTableMigration";
import { CreateSettingsTableMigration } from "./createSettingsTableMigration";
import { CreateTagsTableMigration } from "./createTagsTableMigration";
import { UpdateExpenseTableAmountFormatMigration } from "./updateExpenseTableAmountFormatMigration";


export const migrations = [
    CreateMigrationsTableMigration,
    CreateExpenseTableMigration,
    CreateExpensesTableMigration,
    CreateExpenseCategoriesTableMigration,
    CreateTagsTableMigration,
    CreateExpenseTagsMigration,
    UpdateExpenseTableAmountFormatMigration,
    CreateSettingsTableMigration
]