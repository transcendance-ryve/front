import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import { useNotifStore } from '@/stores/NotificationsStore'

const register = async (username: string, email:string, password:string) => {

	const { response, error } = await useAxios(
		'post',
		'/auth/register',
		{ username, email, password }
	)
	if (!error.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
		userStore.loginApi = true
		useNotifStore().addNotif('success', 'Welcome', 'You are now logged in')
		router.push({ path: '/' })
	}
}

export default register