import { create } from "zustand"
import { Settings } from "../database/Settings"

export const useSettingsStore = create((set, get) => ({
	settings: {},
	loading: false,
	setSettings: (option) => {
		set({ settings: { ...get().settings, ...option } })
	},
	init: async () => {
		set({ loading: true })
		const settings = await new Settings().select()
		settings.forEach((el) => {
			get().setSettings({ [el.slug]: { value: el.value, payload: el.payload } })
		})

		set({ loading: false })
	},
}))
