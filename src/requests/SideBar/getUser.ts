import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { Ref } from 'vue'

export interface User {
	id: string,
	username: string,
	avatar: string,
	status: string,
	level: number,
	experience: number,
	next_level: number,
	rank_point: number,
	wins: number,
	loses: number,
	played: number
}

const getUsers = async (id: string, select: string, user: Ref<Partial<User>>) => {

	const	dataState: axiosState = { error: null, loading: true }
	const { response, loading, error } = await useAxios(
		'get',
		'/users/'
		+ id + '?select=' + select
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		user.value = response.value
	}
	return dataState
}

export default getUsers