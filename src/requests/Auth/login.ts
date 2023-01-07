import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const login = async (email:string, password:string) => {

	const { response, loading, error } = await useAxios(
		'post',
		'/auth/login',
		{ email, password }
	)
	if (response.value) {
		const { tfa, token, id } = response.value
		if (tfa)
		return router.push({ path: '/accounts/login/tfa',
			query: {
				token: token,
				id: id
			}
		})
	}
	// await updateLoginApi()
	if (response.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
		userStore.loginApi = true
	}
	router.push({ path: '/' })
}

export default login