import { create } from "zustand"
import Tags from "../database/Tags"

export const useTagsStore = create((set, get) => ({
	form: {
		title: "",
		allow_expenses: false,
	},
	tags: [],
	loading: false,
	init: async () => {
		set({ loading: true })
		set({ tags: await new Tags().select() })
		set({ loading: false })
	},

	submit: async () => {
		set({ loading: true })
		try {
			const form = get().form
			await Tags.store(form)
			await get().updateFormValues("title", "")
			await get().updateFormValues("allow_expenses", false)
			await get().init()
		} catch (error) {
			console.log(error)
		} finally {
			set({ loading: false })
		}
	},
	updateFormValues: (key, value) => {
		set({ form: { ...get().form, [key]: value } })
	},
}))
