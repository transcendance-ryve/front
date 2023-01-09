import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getMyChannels = async (dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/ofUser'
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

export default getMyChannels