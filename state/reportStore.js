import { create } from "zustand"
import { REPORT_GROUPS, REPORT_PERIODS } from "../config/consts"
import { ExpenseCategories } from "../database/ExpenseCategories"
import { Expenses } from "../database/Expenses"
import { mapExportData, mapReportData } from "../helpers/report"
import DateTimeService from "../services/DateTimeService"
import ExportService from "../services/ExportService"
import i18n from "../i18n/configuration"
import { showMessage } from "react-native-flash-message"

export const useReportStore = create((set, get) => ({
	tableId: null,
	report: {
		headers: [],
		rows: [],
		titles: [],
	},
	data: {
		categories: [],
		expenses: [],
	},
	filters: {
		group: REPORT_GROUPS.DAY,
		period: REPORT_PERIODS.MONTH,
	},
	loading: false,

	setFilter: async (key, value) => {
		set({ filters: { ...get().filters, [key]: value } })
		await get().fetch()
	},
	init:
		(tableId) =>
		async (group = REPORT_GROUPS.DAY) => {
			get().setFilter("group", group)
			set({ tableId })
			await get().fetch()
		},
	fetch: async () => {
		set({ loading: true })
		const filters = get().filters

		const period = DateTimeService.getDatePeriod(filters.period)

		const expenses = Array.from(
			await new Expenses().byGroup(filters.group, {
				expenses_table_id: get().tableId,
				from: period.from,
				to: period.to,
			})
		)

		const categories = Array.from(await new ExpenseCategories().select())

		const data = { categories, expenses }
		const { headers, rows, titles } = mapReportData({filters, ...data})

		set({ data })
		set({ report: { titles, rows, headers } })
		set({ loading: false })
	},
	export: async () => {
		set({ loading: true })
		try {
			await ExportService.export(mapExportData({filters: get().filters,...get().data}))
			showMessage({ type: "success", message: i18n.t("notification.report_export_success") })
		} catch (error) {
			console.log(error)
			showMessage({ type: "danger", message: i18n.t("notification.report_export_error") })
		} finally {
			set({ loading: false })
		}
	},
}))
