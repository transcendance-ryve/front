import useAxios from '@/requests/useAxios'

const getBlockRelation = async (targetId: string) => {
	console.log('in getBlockRelation', targetId)
	const { response, loading, error } = await useAxios(
		'get',
		'/channels/isBlocked/' + targetId,
	)
	if (error.value) {
		//	handle errors
	}
	else if (response.value) {
		return response.value
	}
}

export default getBlockRelation