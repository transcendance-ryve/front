import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { Ref } from 'vue'

export interface message { value: string }

const getMessages = async (id: string, page: number, res: Ref<any[]>, totalMsg: Ref<number>) => {

	const	dataState: axiosState = { error: null, loading: true }
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/messages/'
		+ id + '?take=30&page=' + page
	)
	if (error.value) {
		//	handle errors
		dataState.error = error.value
	}
	else if (response.value) {
		res.value = response.value.res
		totalMsg.value = response.value.total
		dataState.loading = loading.value
	}
	return dataState
}

export default getMessages
