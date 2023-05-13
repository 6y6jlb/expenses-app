import MainScreen from "../../screens/main/MainScreen"
import NewCategory from "../../screens/newCategory/NewCategory"
import UpsertExpense from "../../screens/upsertExpense/UpsertExpense"
import ReportScreen from "../../screens/report/ReportScreen"
import UpdateTableScreen from "../../screens/updateTable/UpdateTableScreen"
import i18n from "../../i18n/configuration"

export const ROUTES = [
	{
		options: { title: i18n.t("navigation.title.main") },
		path: "main",
		screen: MainScreen,
	},

	{
		options: { title: i18n.t("navigation.title.report") },
		path: "report",
		screen: ReportScreen,
	},

	{
		options: { title: i18n.t("navigation.title.update_table") },
		path: "update",
		screen: UpdateTableScreen,
	},

	{
		options: { title: i18n.t("navigation.title.expense") },
		path: "upsert-expense",
		screen: UpsertExpense,
	},

	{
		options: { title: "New Category" },
		path: "new-category",
		screen: NewCategory,
	},
]
