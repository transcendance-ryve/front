import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import { useUserStore } from '@/stores/UserStore'

const getMyChannels = async (dataState: axiosState) => {

	const	userStore = useUserStore()
	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/byUser/'
		+ userStore.me.id
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