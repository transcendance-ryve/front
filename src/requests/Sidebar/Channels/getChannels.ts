import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getChannels = async (toFind: string, dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels'
		+ '?search=' + toFind
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		return response.value
	}
}

export default getChannels