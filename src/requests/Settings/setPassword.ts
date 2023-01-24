import useAxios from '@/requests/useAxios'

const setAvatar = async (old_password: string, password: string) => {

	const { error } = await useAxios(
		'put',
		'/users/password',
		{ old_password, password },
	)
	if (error.value) {
		if (error.value.response?.status === 409) {
			return false
		}
	}
	return true
}

export default setAvatar