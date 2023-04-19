import { create } from "zustand"

export const useErrorsStore = create((set, get) => ({
	errors: [],
	loading: false,
	setErrors: (error) => {
		set({ errors: [...get().errors, error] })
	},
	removeAll: () => set({ errors: [], loading: false }),
}))
