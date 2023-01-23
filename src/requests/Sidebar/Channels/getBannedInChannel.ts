import useAxios from '@/requests/useAxios'
import type { axiosState } from '@/requests/useAxios'
import type { TargetTag } from '@/types/User'

const   getUserTagArray = (response: any[]) => {

	const	res: TargetTag[] = []

	response.map(val => {
		res.push({
			id: val.id,
			username: val.username,
			avatar: val.avatar,
			role: 'MEMBER',
			isMute: false,
			isBan: true,
			isBlocked: false,
		})
	})
	return res
}

const   getBannedInChannels = async (channelId: string, dataState: axiosState) => {

	dataState.loading = true
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/banned/'
		+ channelId
	)
	if (error.value)
		dataState.error = error.value
	else {
		dataState.loading = loading.value
		return getUserTagArray(response.value)
	}
	return []
}

export default getBannedInChannels