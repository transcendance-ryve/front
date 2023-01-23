import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'

const getUsers = async (toFind: string, dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users?select=id,username,avatar'
		+ '&search=' + toFind
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		return response.value.users
	}
}

export default getUsers