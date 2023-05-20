import MainScreen from "../../screens/main/MainScreen"
import NewCategoryScreen from "../../screens/newCategory/NewCategory"
import UpsertExpenseScreen from "../../screens/upsertExpense/UpsertExpense"
import ReportScreen from "../../screens/report/ReportScreen"
import UpdateTableScreen from "../../screens/updateTable/UpdateTableScreen"
import i18n from "../../i18n/configuration"
import TagsScreen from "../../screens/Tags/TagsScreen"

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
		screen: UpsertExpenseScreen,
	},

	{
		options: { title: i18n.t("navigation.title.tags") },
		path: "tags",
		screen: TagsScreen,
	},

	{
		options: { title: i18n.t("navigation.title.new_category") },
		path: "new-category",
		screen: NewCategoryScreen,
	},
]
