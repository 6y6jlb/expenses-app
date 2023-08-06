import i18n from "../../i18n/configuration"
import TagsScreen from "../../screens/Tags/TagsScreen"
import MainScreen from "../../screens/main/MainScreen"
import NewCategoryScreen from "../../screens/newCategory/NewCategory"
import ReportScreen from "../../screens/report/ReportScreen"
import SettingsScreen from "../../screens/settings/SettingsScreen"
import UpsertExpenseScreen from "../../screens/upsertExpense/UpsertExpense"
import { PATH } from "./routes"

export const RESTRICTIONS = {
	TABLE: "table",
}



export const ROUTES = {
	AUTH: [
		{
			options: { title: i18n.t("navigation.title.main") },
			path: PATH.MAIN,
			screen: MainScreen,
		},
		{
			options: { title: i18n.t("navigation.title.report") },
			path: PATH.TABLE_REPORT,
			screen: ReportScreen,
			restriction: [RESTRICTIONS.TABLE],
		},

		{
			options: { title: i18n.t("navigation.title.expense") },
			path: PATH.EXPENSE_UPSERT,
			screen: UpsertExpenseScreen,
			restriction: [RESTRICTIONS.TABLE],
		},

		{
			options: {
				title: i18n.t("navigation.title.tags"),
			},
			path: PATH.TAGS,
			screen: TagsScreen,
		},

		{
			options: { title: i18n.t("navigation.title.new_category") },
			path: PATH.NEW_CATEGORY,
			screen: NewCategoryScreen,
		},
		{
			options: { title: i18n.t("navigation.title.settings") },
			path: PATH.SETTINGS,
			screen: SettingsScreen,
		},
	],
	GUEST: [],
}
