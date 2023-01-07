import useAxios from '@/requests/useAxios'
import { useUserStore } from '@/stores/UserStore'

const toggle2FA = async (code: string) => {

	// dataState.loading = true
	const { response, loading, error } = await useAxios(
		'put',
		'/auth/tfa/toggle?code='
		+ code
	)
	if (error.value) {
		//	handle errors
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

export default toggle2FA