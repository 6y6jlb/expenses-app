import { create } from "zustand"
import { useTableStore } from "./tableStore"

export const useUpdateTableStore = create((set, get) => ({
	data: {
		title: "",
		currency: "",
	},
	visible: false,
	show: (tableId) => {
		set({ visible: true })
		const table = useTableStore.getState().tables.find((el) => el.id === tableId)

		const data = {
			id: table.id,
			title: table.title,
			currency: table.currency,
		}
		set({ data: data })
	},
	submit: () => {
		useTableStore.getState().update(get().data)
		useTableStore.getState().init()
		get().hide()
	},
	updateFormValues: (key, value) => {
		set({ data: { ...get().data, [key]: value } })
	},

	hide: () =>
		set({
			data: {
				title: "",
				currency: "",
			},
			visible: false,
		}),
}))
