import moment from "moment"
import { DEFAULT_DAY_FORMAT } from "../config/consts"

export const geDateRange = (startDate, endDate) => {
	const timeseries = {}
	timeseries[startDate.format(DEFAULT_DAY_FORMAT)] = {}
	while (startDate.diff(endDate, "days") > 0) {
		const newDate = startDate.subtract(1, "days")
		timeseries[newDate.format(DEFAULT_DAY_FORMAT)] = {}
	}
	return timeseries
}
