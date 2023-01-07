import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const register = async (username: string, email:string, password:string) => {

	const { response, loading, error } = await useAxios(
		'post',
		'/auth/register',
		{ username, email, password }
	)
	// await updateLoginApi()
	if (response.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
		userStore.loginApi = true
		router.push({ path: '/' })
	}
}

export default register