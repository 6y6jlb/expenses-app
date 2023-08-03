import { create } from "zustand"
import { APP_STATE } from "../config/consts"
import AppService from "../services/AppService"

export const useAppStore = create((set, get) => ({
	state: APP_STATE.NOT_READY,
	init: async () => {
		set({ loading: APP_STATE.INITIALIZING })
		try {
			await AppService.init()
			set({ state: APP_STATE.READY })
		} catch (error) {
			set({ state: APP_STATE.NOT_READY })
		}
	},
	ready: () => {
		return get().state === APP_STATE.READY
	},
}))
