import MainScreen from "../../screens/main/MainScreen"
import NewCategory from "../../screens/newCategory/NewCategory"
import NewExpense from "../../screens/newExpense/NewExpense"
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
		options: { title: "New Expense" },
		path: "new-expense",
		screen: NewExpense,
	},

	{
		options: { title: "New Category" },
		path: "new-category",
		screen: NewCategory,
	},
]
