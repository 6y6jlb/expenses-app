import { REPORT_GROUPS } from "../config/consts"
import i18n from "../i18n/configuration"
import { geDateRange } from "./dateRange"

export const mapReportData = (group, data) => {
	const { filters, categories, expenses } = data
	const timeseries = geDateRange(filters.date.from, filters.date.to)

	const tableCategories = new Set(expenses.map((el) => el.category_id))
	const filteredCategories = categories.filter((el) => tableCategories.has(el.id))

	let result = {
		headers: [],
		rows: [],
		titles: [],
	}

	switch (group) {
		case REPORT_GROUPS.DAY:
			for (const date in timeseries) {
				filteredCategories.forEach((el) => {
					timeseries[date][el.id] = 0
				})
			}

			expenses.forEach((el) => {
				if (timeseries[el.date]) {
					timeseries[el.date] = { ...timeseries[el.date], [el.category_id]: el.amount }
				}
			})

			for (const date in timeseries) {
				timeseries[date] = Object.values(timeseries[date])
				result.titles.push(date)
			}
			result.rows = Object.values(timeseries)
			result.headers = filteredCategories.map((el) => el.title)

			break

		default:
			result.headers = ["date", "amount", "category", "currency", "description"].map((el) =>
				i18n.t(`report.headers.${el}`)
			)
			result.titles = expenses.map((el) => el.id)
			result.rows = expenses.map((el) => {
				el.category = filteredCategories.find((filteredElement) => filteredElement.id === el.category_id)

				return [el.date, el.amount, el.category.title, el.currency, el.description ?? "-"]
			})
			break
	}

	return result
}
