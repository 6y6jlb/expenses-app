export const CURRENCIES = {
	RUB: {
		symbol: "₽",
		label: "RUB",
	},
	USD: {
		symbol: "$",
		label: "USD",
	},
	GEL: {
		symbol: "ლ",
		label: "GEL",
	},
	EUR: {
		symbol: "€",
		label: "EUR",
	},
}

export const DEFAULT_DAY_FORMAT = "YYYY-MM-DD"

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
}

export const REPORT_PERIODS = {
	// ALL_TIME: "all_time",
	DAY: "day",
	MONTH: "month",
	YEAR: "year",
}

export const SERVICE = {
	MAIN: {
		BASE: "https://lbas.website:5000/api",
		PATH: {
			EXHCANGE: {
                RATE: "exchange/rate"
            },
		},
	},
}
