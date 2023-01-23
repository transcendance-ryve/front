import useAxios from '@/requests/useAxios'
import { useUserStore } from '@/stores/UserStore'

const toggle2FA = async (code: string) => {

	const { response, error } = await useAxios(
		'put',
		'/auth/tfa/toggle?code='
		+ code
	)
	if (error.value) {
		if (error.value.response?.status === 409) {
			return false
		}
	}
	else {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
	}
	return true
}

export default toggle2FA