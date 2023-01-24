import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'
import { useNotifStore } from '@/stores/NotificationsStore'

const login = async (email:string, password:string) => {

	const { response, error } = await useAxios(
		'post',
		'/auth/login',
		{ email, password }
	)
	if (!error.value) {
		const { tfa, token, id } = response.value
		if (tfa)
			return router.push({ path: '/accounts/login/tfa',
				query: {
					token: token,
					id: id
				}
			})

		const	userStore = useUserStore()
		userStore.updateMe(response.value)
		userStore.loginApi = true
		useNotifStore().addNotif('success', 'Success', 'You are now logged in')
		router.push({ path: '/' })
	}
}

export default login