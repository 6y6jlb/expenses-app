import { CURRENCIES, REPORT_GROUPS } from "../config/consts"
import i18n from "../i18n/configuration"
import DateTimeService from "../services/DateTimeService"


export const mapReportData = ({ filters, categories, expenses }) => {
	
	const period = DateTimeService.getDatePeriod(filters.period)

	const timeseries = DateTimeService.getDateSeries(period.from, period.to)

	const tableCategories = new Set(expenses.map((el) => el.category_id))
	const filteredCategories = categories.filter((el) => tableCategories.has(el.id))

	let result = {
		headers: [],
		rows: [],
		titles: [],
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
					timeseries[el.date] = { ...timeseries[el.date], [el.category_id]: i18n.numberToCurrency( el.amount,{unit: CURRENCIES[el.currency].symbol}) }
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

				return [el.date, i18n.numberToCurrency( el.amount, {unit: CURRENCIES[el.currency].symbol}), el.category.title, el.currency, el.description ?? "-"]
			})
			break
	}

	return result
}

export const getArrWidth = (headers, rows) => {
	const arrWidth = headers.map((el, index) => {
	  const maxColWidth = rows.reduce((prev, curr) => {
		if (String(curr[index]).length > prev) {
		  prev = String(curr[index]).length;
		}
		return prev;
	  }, el.length);
  
	  return Math.min(Math.max(maxColWidth * 10 + 12, 100), 300);
	});
  
	return arrWidth;
  };
