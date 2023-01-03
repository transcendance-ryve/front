import useAxios from '@/requests/useAxios'

const setAvatar = async (username: string) => {

		const { response, loading, error } = await useAxios(
			'put',
			'/users/avatar',
			JSON.stringify({
				username
			})
		)
		if (error.value) {
			//	handle errors
		}
		else if (response.value) {
			
		}
}

export default setAvatar