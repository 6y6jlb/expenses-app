import { create } from "zustand"

export const useNotificationStore = create((set, get) => ({
	notifications: [],
	setNotification: (error) => {
		set({ notifications: [...get().notifications, error] })
	},
	removeAll: () => set({ notifications: [] }),
}))
