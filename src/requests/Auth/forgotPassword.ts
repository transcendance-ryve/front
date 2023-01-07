import useAxios from '@/requests/useAxios'
import router from '@/router'
import { useUserStore } from '@/stores/UserStore'

const register = async (username: string, email:string, password:string) => {

	const { response, loading, error } = await useAxios(
		'post',
		'/auth/forgot-password',
		{ email }
	)
}

export default register