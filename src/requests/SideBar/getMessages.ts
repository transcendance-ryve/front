import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { Ref } from 'vue'

export interface message { value: string }

// const getMessages = async (id: string, res: Ref<message>) => {
const getMessages = async (id: string, res: Ref<any[]>) => {

	const	dataState: axiosState = { error: null, loading: true }
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/messages/'
		+ id
	)
	if (error.value) {
		//	handle errors
		dataState.error = error.value
	}
	else if (response.value) {
		console.log('msg res', response.value)
		res.value = response.value
		dataState.loading = loading.value
	}
	return dataState
}

export default getMessages