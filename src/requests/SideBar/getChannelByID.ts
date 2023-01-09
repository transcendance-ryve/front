import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { Ref } from 'vue'

export interface channel { id: string, name: string, status: string, usersCount: number }

const getChannelByID = async (id: string, res: Ref<channel>) => {

	const	dataState: axiosState = { error: null, loading: true }
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/'
		+ id
	)
	if (error.value) {
		//	handle errors
		dataState.error = error.value
	}
	else if (response.value) {
		res.value = response.value
		dataState.loading = loading.value
	}
	return dataState
}

export default getChannelByID
