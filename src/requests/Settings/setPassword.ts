import useAxios from '@/requests/useAxios'
import { useUserStore } from '@/stores/UserStore'


const setAvatar = async (old_password: string, password: string) => {

	const { response, loading, error } = await useAxios(
		'put',
		'/users/password',
		{ old_password, password },
	)
	if (error.value) {
		if (error.value.response?.status === 409) {
			return false
		}
	}
	else if (response.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
	}
	return true
}

export default setAvatar