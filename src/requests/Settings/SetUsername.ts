import useAxios from '@/requests/useAxios'
import { useUserStore } from '../../stores/UserStore'

const setUsername = async (username: string) => {
	const userStore = useUserStore()

		const { response, loading, error } = await useAxios(
			'put',
			'/users/username/',
			JSON.stringify({
				username
			})
		)
		if (error.value) {
			//	handle errors
		}
		else if (response.value)
			userStore.updateMe(response.value)
}

export default setUsername