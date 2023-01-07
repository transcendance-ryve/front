import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const disconnect = async () => {

	await useAxios(
		'delete',
		'/auth/disconnect'
	)
	localStorage.clear()
	const	userStore = useUserStore()
	userStore.me.value = ''
	userStore.loginApi = false
	if (!router.currentRoute.value.fullPath.includes('/accounts'))
		router.push({ path: '/accounts' })
}

export default disconnect