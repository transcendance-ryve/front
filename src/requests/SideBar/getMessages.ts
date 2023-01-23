import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { Ref } from 'vue'

const getMessages = async (id: string, page: number, res: Ref<any[]>, totalMsg: Ref<number>) => {

	const	dataState: axiosState = { error: null, loading: true }
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/messages/'
		+ id + '?take=30&page=' + page
	)
	if (error.value)
		dataState.error = error.value
	else {
		res.value = response.value.messages
		totalMsg.value = response.value.total
		dataState.loading = loading.value
	}
	return dataState
}

export default getMessages
