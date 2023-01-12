import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getUsersInChannel = async (id: string, dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/users/'
		+ id
	)
	if (error.value) {
		//	handle errors
		dataState.error = error.value
	}
	else if (response.value) {
		dataState.loading = loading.value
		return response.value
	}
}

export default getUsersInChannel