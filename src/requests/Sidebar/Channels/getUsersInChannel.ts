import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getUsersInChannel = async (id: string, dataState: axiosState = {} as axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/users/'
		+ id
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		return response.value
	}
}

export default getUsersInChannel