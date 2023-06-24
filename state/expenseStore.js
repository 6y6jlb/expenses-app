import moment from "moment"
import { create } from "zustand"
import { ExpenseTags } from "../database/ExpenseTags"
import { Expenses } from "../database/Expenses"
import { Tag } from "../database/Tags"
import ExpensesService from "../services/ExpensesService"
import { ExpensesDTO } from "../services/dto/expensesDTO"
import { useCategoryStore } from "./categoryStore"
import { useReportStore } from "./reportStore"
import { useTableStore } from "./tableStore"
import i18n from "../i18n/configuration"
import { showMessage } from "react-native-flash-message"

export const useExpenseStore = create((set, get) => ({
	data: {},
	loading: true,
	init: async (params) => {
		set({ loading: true })

		let table = {}

		await useCategoryStore.getState().fetch()
		const categories = Array.from(await useCategoryStore.getState().categories)
		const tag = new Tag()
		const tags = Array.from(await tag.select())
		const data = { categories, tags }

		try {
			if (params.table?.id) {
				table = Array.from(useTableStore.getState().tables).find((el) => el.id === params.table.id)

				data["tableId"] = params.table.id
				data["date"] = new Date()
				data["amount"] = "1"
				data["currency"] = table.currency
				data["tableCurrency"] = table.currency
				data["categoryId"] = categories[0].id
				data["description"] = ""
				data["selectedTags"] = []
			} else if (params.expense?.id) {
				const expense = (await new Expenses().select({ id: params.expense.id }))[0]
				table = Array.from(useTableStore.getState().tables).find((el) => el.id === expense.expenses_table_id)
				const tags = await tag.select()
				const expenseTags = await new ExpenseTags().select({ expense_id: expense.id })
				const expensesTagsIds = expenseTags.map((el) => el.tag_id)

				data["expenseId"] = expense.id
				data["date"] = new Date(expense.created_at * 1000)
				data["amount"] = String(expense.amount)
				data["currency"] = expense.currency
				data["tableCurrency"] = table.currency
				data["categoryId"] = expense.category_id
				data["description"] = expense.description ?? ""
				data["tags"] = tags.map((el) => ({ ...el, selected: expensesTagsIds.includes(el.id) }))
			}
		} catch (error) {
			console.log(error)
		} finally {
			set({ data: data })
			set({ loading: false })
		}
	},
	submit: async () => {
		set({ loading: true })
		const data = get().data
		try {
			// backend current ssl issue with react-native
			// if (data.currency !== data.tableCurrency) {
			// 	data.amount = await Exchange.get({ count: data.amount, target: data.currency, current: data.tableCurrency })
			// }

			const expensesDTO = new ExpensesDTO(
				data.expenseId ?? null,
				data.amount,
				moment(data.date).format("X"),
				data.tableId ?? null,
				data.categoryId,
				data.tableCurrency,
				data.description,
				data.tags.filter((el) => el.selected)
			)

			await ExpensesService.handle(expensesDTO)
			showMessage({ type: "success", message: i18n.t("notification.expense_save_success") })
		} catch (error) {
			console.log(error)
			showMessage({ type: "danger", message: i18n.t("notification.expense_save_error") })
		} finally {
			if (data.expenseId) {
				await useReportStore.getState().fetch()
			} else {
				await useTableStore.getState().init()
			}
			set({ loading: false })
			set({ data: { ...get().data, amount: "1", description: "", selectedTags: [] } })
		}
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},
}))
