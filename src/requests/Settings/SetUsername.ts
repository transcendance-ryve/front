import useAxios from '@/requests/useAxios'
import { useUserStore } from '../../stores/UserStore'

const setUsername = async (username: string) => {

		const { response, loading, error } = await useAxios(
			'put',
			'/users/username',
			{ username }
		)
		if (error.value) {
			//	handle errors
		}
		else if (response.value) {
			const	userStore = useUserStore()
			userStore.updateMe(response.value)
		}
}

export default setUsername