export const CURRENCIES = {
	RUB: {
		symbol: "₽",
		label: "RUB",
		format: "%n%u",
	},
	USD: {
		symbol: "$",
		label: "USD",
		format: "%u%n",
	},
	GEL: {
		symbol: "ლ",
		label: "GEL",
		format: "%n%u",
	},
	EUR: {
		symbol: "€",
		label: "EUR",
		format: "%u%n",
	},
}

export const DEFAULT_DATE_FORMAT = "YYYY-MM-DD"

export const DEFAULT_CATEGORIES = [
	{
		title: "OTHER",
		description: "",
	},
	{
		title: "GROCERIES",
		description: "",
	},
	{
		title: "TRANSPORT",
		description: "",
	},
	{
		title: "TAXES",
		description: "",
	},
	{
		title: "RENT",
		description: "",
	},
]

export const DEFAULT_TABLE = {
	TITLE: "DEFAULT",
	CURRENCY: CURRENCIES.USD.label,
}

export const REPORT_GROUPS = {
	INDEX: "index",
	DAY: "day",
	TAG: "tag",
}

export const REPORT_PERIODS = {
	// ALL_TIME: "all_time",
	DAY: "day",
	MONTH: "month",
	YEAR: "year",
}

export const SERVICE = {
	MAIN: {
		BASE: "https://lbas.website:5000/api/",
		PATH: {
			EXHCANGE: {
				RATE: "exchange/rate",
			},
		},
	},
}

export const SETTINGS = {
	DEFAULT_TABLE_ID: "default_table_id",
	DEFAULT_DATE_INTERVAL: "default_date_interval",
	DEFAULT_DATE_FORMAT: "default_date_format",
}

export const APP_STATE = {
	INITIALIZING: 'INITIALIZING',
	READY: 'READY',
	NOT_READY: 'NOT_READY'
}
