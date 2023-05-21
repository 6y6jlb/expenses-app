import { create } from "zustand"
import Tags from "../database/Tags"

export const useTagsStore = create((set, get) => ({
	form: {
		title: "",
	},
	tags: [],
	loading: false,
	init: async () => {
		set({ loading: true })
		set({ tags: (await Tags.select()).map(el=>({...el, selected: false})), loading: false })
	},
	store: (tag) => {
		set({ tags: [...get().categories, ...categories] })
	},

	submit: async () => {
		set({ loading: true })
		try {
			const form = get().form
			await Tags.store(form)
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
	togleTags: (tag) => {
		const mappedTags = get().tags.map(el=>{
			return el.id === tag.id ? {...el, selected: !el.selected} : el
		});
		set({ tags: mappedTags })
	},
}))
