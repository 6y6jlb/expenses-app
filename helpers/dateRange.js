import { DEFAULT_DAY_FORMAT } from "../config/consts";

export const geDateRange = (startDate, endDate) => {
	const clonedStartDate = startDate.clone();
	const clonedEndDate = endDate.clone();
	const timeseries = {}
	timeseries[clonedStartDate.format(DEFAULT_DAY_FORMAT)] = {}
	while (clonedStartDate.diff(clonedEndDate, "days") > 0) {
		const newDate = clonedStartDate.subtract(1, "days")
		timeseries[newDate.format(DEFAULT_DAY_FORMAT)] = {}
	}
	return timeseries
}
