import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

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
		router.push({ path: '/' })
	}
}

export default login