import { CURRENCIES, REPORT_GROUPS } from "../config/consts"
import i18n from "../i18n/configuration"
import DateTimeService from "../services/DateTimeService"

const EXPENSE_COLUMNS_REPORT = ["date", "category", "amount", "description", "tags", "empty"]
const EXPENSE_COLUMNS_EXPORT = ["date", "category", "amount", "currency", "description", "tags"]

export const mapReportData = ({ filters, categories, expenses }) => {
	const period = DateTimeService.getDatePeriod(filters.period)

	const timeseries = DateTimeService.getDateSeries(period.from, period.to)

	const tableCategories = new Set(expenses.map((el) => el.category_id))
	const filteredCategories = categories.filter((el) => tableCategories.has(el.id))

	let report = {
		headers: [],
		rows: [],
		titles: [],
	}

	const summaryAmount = expenses.reduce((prev, curr) => (prev += curr.amount), 0)
	const currency = expenses[0] ? CURRENCIES[expenses[0].currency] : null


	let summary = {}
	switch (filters.group) {
		case REPORT_GROUPS.DAY:
			for (const date in timeseries) {
				filteredCategories.forEach((el) => {
					summary[el.title] = 0
					timeseries[date][el.id] = 0
				})
			}

			expenses.forEach((el) => {
				if (timeseries[el.date]) {
					timeseries[el.date] = {
						...timeseries[el.date],
						[el.category_id]: numberToCurrency(el.amount, currency),
					}
				}
				const summaryKey = filteredCategories.find((cat) => cat.id === el.category_id).title
				summary[summaryKey] += +el.amount ?? 0
			})

			for (const date in timeseries) {
				timeseries[date] = Object.values(timeseries[date])
				report.titles.push(date)
			}
			report.rows = Object.values(timeseries)
			report.headers = filteredCategories.map((el) => el.title)
			summary[i18n.t(`report.headers.summary`)] = expenses.reduce((prev, curr) => (prev += curr.amount), 0)

			Object.keys(summary).forEach((key) =>(summary[key] = numberToCurrency(summary[key], currency)))

			break

		default:
			report.headers = EXPENSE_COLUMNS_REPORT.map((el) => i18n.t(`report.headers.${el}`))
			report.titles = expenses.map((el) => el.id)
			report.rows = expenses.map((el) => {
				el.category = filteredCategories.find((filteredElement) => filteredElement.id === el.category_id)

				return [
					el.date,
					el.category.title,
					numberToCurrency(el.amount, currency),
					el.description ?? "-",
					el.tags,
					el.id,
				]
			})

			summary = {
				[i18n.t(`report.headers.summary`)]: numberToCurrency(summaryAmount, currency),
			}
			break
	}

	return { report, summary }
}

export const getArrWidth = (headers, rows, additionalColumns = []) => {
	const arrWidth = headers.map((el, index) => {
		const maxColWidth = rows.reduce((prev, curr) => {
			if (String(curr[index]).length > prev) {
				prev = String(curr[index]).length
			}
			return prev
		}, el.length)

		return Math.min(Math.max(maxColWidth * 10 + 12, 100), 300)
	})

	return [...arrWidth, ...additionalColumns]
}

export const mapExportData = ({ filters, categories, expenses }) => {
	{
		const period = DateTimeService.getDatePeriod(filters.period)

		const timeseries = DateTimeService.getDateSeries(period.from, period.to)

		const tableCategories = new Set(expenses.map((el) => el.category_id))
		const filteredCategories = categories.filter((el) => tableCategories.has(el.id))

		let result = {
			headers: [],
			rows: [],
		}

		switch (filters.group) {
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
					timeseries[date] = [date, ...Object.values(timeseries[date])]
				}
				result.rows = Object.values(timeseries)
				result.headers = filteredCategories.map((el) => el.title)

				break

			default:
				result.headers = EXPENSE_COLUMNS_EXPORT.map((el) => i18n.t(`report.headers.${el}`))
				result.rows = expenses.map((el) => {
					el.category = filteredCategories.find((filteredElement) => filteredElement.id === el.category_id)

					return [el.id, el.date, el.category.title, el.amount, el.currency, el.description ?? "-", el.tags]
				})
				break
		}

		result.headers.unshift("")

		return [result.headers, ...Object.values(result.rows)]
	}
}

const numberToCurrency = (number, currency) => {
	return currency
		? i18n.numberToCurrency(number, {
				unit: currency.symbol,
				format: currency.format,
		  })
		: number
}
