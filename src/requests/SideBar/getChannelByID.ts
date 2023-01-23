import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { Ref } from 'vue'

export interface Channel { id: string, avatar: string, name: string, status: string }

const getChannelByID = async (id: string, res: Ref<Partial<Channel>>) => {

	const	dataState: axiosState = { error: null, loading: true }
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/'
		+ id
	)
	if (error.value)
		dataState.error = error.value
	else {
		res.value = response.value
		dataState.loading = loading.value
	}
	return dataState
}

export default getChannelByID
