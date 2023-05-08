import MainScreen from "../../screens/main/MainScreen"
import NewCategory from "../../screens/newCategory/NewCategory"
import UpsertExpense from "../../screens/upsertExpense/UpsertExpense"
import ReportScreen from "../../screens/report/ReportScreen"
import UpdateTableScreen from "../../screens/updateTable/UpdateTableScreen"

export const ROUTES = [
	{
		options: { title: "Main Page" },
		path: "main",
		screen: MainScreen,
	},

	{
		options: { title: "Table Report" },
		path: "report",
		screen: ReportScreen,
	},

	{
		options: { title: "Table Update" },
		path: "update",
		screen: UpdateTableScreen,
	},

	{
		options: { title: "Expense" },
		path: "upsert-expense",
		screen: UpsertExpense,
	},

	{
		options: { title: "New Category" },
		path: "new-category",
		screen: NewCategory,
	},
]
