import moment from "moment";
import { DEFAULT_DAY_FORMAT } from "../config/consts";


export const geDateRange = (startDate, endDate) => {
    const diffInDays =  startDate.diff(endDate, 'days');
    const timeseries = {};
    for (let i = 0; i < diffInDays; i++) {
        const newDate = startDate.add(i, 'days')
        timeseries[newDate.format(DEFAULT_DAY_FORMAT)] = {date: newDate};
        
    }
    return timeseries
}