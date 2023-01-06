import useAxios from '@/requests/useAxios'


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
		//	handle success
	}
	return true
}

export default setAvatar