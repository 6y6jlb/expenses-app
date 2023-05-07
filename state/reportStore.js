import moment from "moment"
import { create } from "zustand"
import { REPORT_GROUPS } from "../config/consts"
import ExpenseCategories from "../database/ExpenseCategories"
import Expenses from "../database/Expenses"
import { mapReportData } from "../helpers/report"

export const useReportStore = create((set, get) => ({
	headers: [],
	categories: [],
	rows: [],
	titles: [],
	group: REPORT_GROUPS.DAY,
	tableId: null,
	filters: {
		date: {
			from: moment(),
			to: moment().subtract(1,"month"),
		},
	},
	loading: false,
	setTables: (tables) => {
		set({ tables: [...tables] })
	},
	setGroup: async (group) => {
		set({ group })
		await get().fetch()
	},
	init:
		(tableId) =>
		async (group = REPORT_GROUPS.DAY) => {
			set({ tableId, group })
			await get().fetch()
		},
	fetch: async () => {
		set({ loading: true })
		const filters = get().filters

		const expenses = Array.from(await Expenses.byGroup(get().group, { expenses_table_id: get().tableId }))

		const categories = Array.from(await ExpenseCategories.select())
		const { headers, rows, titles } = mapReportData(get().group, { filters, categories, expenses })

		set({ titles, rows, headers })
		set({ loading: false })
	},

}))
