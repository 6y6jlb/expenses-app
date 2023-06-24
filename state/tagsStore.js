import { showMessage } from "react-native-flash-message"
import { create } from "zustand"
import {Tag} from "../database/Tags"
import i18n from "../i18n/configuration"

export const useTagsStore = create((set, get) => ({
	form: {
		title: "",
	},
	tags: [],
	loading: false,
	init: async () => {
		set({ loading: true })
		try {
			set({ tags: await new Tag().select() })
		} catch (error) {
			console.log(error)
		} finally {
			set({ loading: false })
		}
		
		
	},

	submit: async () => {
		set({ loading: true })
		try {
			const form = get().form
			await new Tag().store(form)
			await get().updateFormValues("title", "")
			showMessage({ type: "success", message: i18n.t("notification.tag_save_success") })
			await get().init()
		} catch (error) {
			console.log(error)
			showMessage({ type: "danger", message: i18n.t("notification.tag_save_error") })
		} finally {
			set({ loading: false })
		}
	},
	updateFormValues: (key, value) => {
		set({ form: { ...get().form, [key]: value } })
	},
}))
