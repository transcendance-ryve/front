import useAxios from '@/requests/useAxios'

const putAvatar = async (username: string) => {

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
		else if (response.value) {
			
		}
}

export default putAvatar