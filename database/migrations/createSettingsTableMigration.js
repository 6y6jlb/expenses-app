import { Settings } from "../Settings"
import { DEFAULT_DATE_FORMAT, SETTINGS, REPORT_PERIODS } from "../../config/consts"
import { useTableStore } from "../../store/tableStore"
import { ExpenseTable } from "../ExpenseTables"

export class CreateSettingsTableMigration extends Settings {
	constructor() {
		super()
	}

	async up() {

		await this.create()

		if( (await this.select({slug: SETTINGS.DEFAULT_DATE_FORMAT })).length === 0) {
			await this.store({ slug: SETTINGS.DEFAULT_DATE_FORMAT, value: DEFAULT_DATE_FORMAT })
		}

		if( (await this.select({slug: SETTINGS.DEFAULT_DATE_INTERVAL })).length === 0) {
			await this.store({ slug: SETTINGS.DEFAULT_DATE_INTERVAL, value: REPORT_PERIODS.MONTH })
		}
		
		
		const tables = await this.db.select((new ExpenseTable()).tableName)

		if (tables && (await this.select({slug: SETTINGS.DEFAULT_TABLE_ID })).length === 0) {
			await this.store({ slug: SETTINGS.DEFAULT_TABLE_ID, value: `${tables[0].id}` })
		}

	}

	async down() {
		await this.drop()
	}
}
