import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getChannelsNotifs = async (dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/invites'
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		return response.value
	}
}

export default getChannelsNotifs