import { create } from "zustand"
import { REPORT_GROUPS, REPORT_PERIODS } from "../config/consts"
import ExpenseCategories from "../database/ExpenseCategories"
import Expenses from "../database/Expenses"
import { mapReportData } from "../helpers/report"
import DateTimeService from "../services/DateTimeService"

export const useReportStore = create((set, get) => ({
	headers: [],
	categories: [],
	rows: [],
	titles: [],
	tableId: null,
	filters: {
		group: REPORT_GROUPS.DAY,
		period: REPORT_PERIODS.MONTH,
	},
	loading: false,
	setTables: (tables) => {
		set({ tables: [...tables] })
	},

	setFilter: async (key, value) => {
		set({ filters: { ...get().filters, [key]: value } })
		await get().fetch()
	},
	init:
		(tableId) =>
		async (group = REPORT_GROUPS.DAY) => {
			get().setFilter('group', group)
			set({ tableId})
			await get().fetch()
		},
	fetch: async () => {
		set({ loading: true })
		const filters = get().filters

		const period = DateTimeService.getDatePeriod(filters.period)

		const expenses = Array.from(await Expenses.byGroup(filters.group, { expenses_table_id: get().tableId , from: period.from, to: period.to }))

		const categories = Array.from(await ExpenseCategories.select())
		const { headers, rows, titles } = mapReportData({ filters, categories, expenses })

		set({ titles, rows, headers })
		set({ loading: false })
	},

}))
