import moment from "moment"
import { create } from "zustand"
import Expenses from "../database/Expenses"
import { ExpensesDTO } from "../services/dto/expensesDTO"
import { useCategoryStore } from "./categoryStore"
import { useTableStore } from "./tableStore"
import { useReportStore } from "./reportStore"
import Exchange from "../http/Exchange"
import Tags from "../database/Tags"

export const useExpenseStore = create((set, get) => ({
	data: {},
	loading: true,
	init: async (params) => {
		set({ loading: true })

		let table = {}

		await useCategoryStore.getState().fetch()
		const categories = Array.from(await useCategoryStore.getState().categories)
		const tags = Array.from(await Tags.select())
		console.log(tags)
		const data = {
			categories: categories,
			tags: tags
		}

		if (params.table?.id) {
			table = Array.from(useTableStore.getState().tables).find((el) => el.id === params.table.id)

			data["tableId"] = params.table.id
			data["date"] = new Date()
			data["amount"] = "1"
			data["currency"] = table.currency
			data["tableCurrency"] = table.currency
			data["categoryId"] = categories[0].id
			data["description"] = ""
		} else if (params.expense?.id) {
			const expense = (await Expenses.select({ id: params.expense.id }))[0]
			table = Array.from(useTableStore.getState().tables).find((el) => el.id === expense.expenses_table_id)

			data["expenseId"] = expense.id
			data["date"] = new Date(expense.created_at * 1000)
			data["amount"] = expense.amount
			data["currency"] = expense.currency
			data["tableCurrency"] = table.currency
			data["categoryId"] = expense.category_id
			data["description"] = expense.description ?? ""
		}

		set({ data: data })
		set({ loading: false })
	},
	submit: async () => {
		set({ loading: true })
		const data = get().data
		if (data.currency !== data.tableCurrency) {
			data.amount = await Exchange.get({ count: data.amount, target: data.currency, current: data.tableCurrency })
		}

		const expensesDTO = new ExpensesDTO(
			null,
			data.amount,
			moment(data.date).format("X"),
			data.tableId ?? null,
			data.categoryId,
			data.tableCurrency,
			data.description
		)

		if (data.expenseId) {
			await Expenses.update(expensesDTO, { id: data.expenseId })
			await useReportStore.getState().fetch()
		} else {
			await Expenses.store(expensesDTO)
			await useTableStore.getState().init()
		}

		set({ loading: false })
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},
}))