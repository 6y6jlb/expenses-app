import moment from "moment/moment"
import { DEFAULT_DAY_FORMAT, REPORT_PERIODS } from "../config/consts"

class DateTimeService {
	constructor() {}

	getDatePeriod(periodKey) {
		const period = {
			from: moment(),
			to: null,
		}
		switch (periodKey) {
			case REPORT_PERIODS.MONTH:
				period.to = moment().startOf('month')
				break
			case REPORT_PERIODS.DAY:
				period.to = moment().startOf("day")
				break
			case REPORT_PERIODS.YEAR:
				period.to = moment().startOf("year")
				break
			default:
				break
		}

		return period
	}


	getDateSeries(startDate, endDate) {
		const clonedStartDate = startDate.clone()
		const clonedEndDate = endDate.clone()
		const timeseries = {}
		timeseries[clonedStartDate.format(DEFAULT_DAY_FORMAT)] = {}
		while (clonedStartDate.diff(clonedEndDate, "days") > 0) {
			const newDate = clonedStartDate.subtract(1, "days")
			timeseries[newDate.format(DEFAULT_DAY_FORMAT)] = {}
		}
		return timeseries
	}
}

export default new DateTimeService()
