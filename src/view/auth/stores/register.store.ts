import { create } from 'zustand'

type Store = {
	userRegisterForm: { email: string; userId: string }
	setUser: (_user: { email: string; userId: string }) => void
	resetUser: () => void
}

export const useReristerFormStore = create<Store>()((set) => ({
	userRegisterForm: { email: '', userId: '' },
	setUser: (_user) => set((state) => ({ ...state, userRegisterForm: _user })),
	resetUser: () => set((state) => ({ ...state, userRegisterForm: { email: '', userId: '' } })),
}))
