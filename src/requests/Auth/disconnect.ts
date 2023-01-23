import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import { useSidebarStore } from '@/stores/SidebarStore'
import type { UserConnected } from '@/types/User'

const disconnect = async () => {

	const	{ error } = await useAxios(
		'delete',
		'/auth/disconnect'
	)
	if (!error.value) {
		localStorage.clear()
		const	userStore = useUserStore()
		const	sbStore = useSidebarStore()
		userStore.me = {} as UserConnected
		userStore.loginApi = false
		userStore.socket.disconnect()
		sbStore.resetState()
		if (!router.currentRoute.value.fullPath.includes('/accounts'))
			router.push({ path: '/accounts' })
	}
}

export default disconnect