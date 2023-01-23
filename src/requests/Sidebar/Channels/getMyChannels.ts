import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getMyChannels = async (dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/ofUser'
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		return response.value.filter((chan: any) => {
			return chan.status !== 'DIRECTMESSAGE'
		})
	}
}

export default getMyChannels