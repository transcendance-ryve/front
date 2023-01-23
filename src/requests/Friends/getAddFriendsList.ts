import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { ContentData } from '@/types/Sidebar'

const getAddFriendsList = async (toFind: string, dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users/friends/relationship'
		+ '?select=id,username,avatar,status&search=' + toFind
	)
	if (error.value)
		dataState.error = error.value
	else {
		const	res: Partial<ContentData>[] = []
		response.value.users.forEach((item: any) => {
			if (item.status === 'NONE') {
				res.push(item.user)
			}
		})
		dataState.loading = loading.value
		return res
	}
}

export default getAddFriendsList