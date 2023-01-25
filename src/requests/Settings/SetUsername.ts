import useAxios from '@/requests/useAxios'
import { useUserStore } from '../../stores/UserStore'

const setUsername = async (username: string) => {

	const { response, error } = await useAxios(
		'put',
		'/users/username',
		{ username }
	)
	if (!error.value) {
		const	userStore = useUserStore()
		userStore.updateMe(response.value)
		return true
	}
	return false
}

export default setUsername