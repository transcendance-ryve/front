import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import { useSideBarStore } from '@/stores/SideBarStore'

const disconnect = async () => {

	await useAxios(
		'delete',
		'/auth/disconnect'
	)
	localStorage.clear()
	const	userStore = useUserStore()
	const	sbStore = useSideBarStore()
	userStore.me.value = ''
	userStore.loginApi = false
	sbStore.resetState()
	if (!router.currentRoute.value.fullPath.includes('/accounts'))
		router.push({ path: '/accounts' })
}

export default disconnect