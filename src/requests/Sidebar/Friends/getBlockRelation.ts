import useAxios from '@/requests/useAxios'

const getBlockRelation = async (targetId: string) => {
	const { response, error } = await useAxios(
		'get',
		'/channels/isBlocked/' + targetId,
	)
	if (!error.value)
		return response.value
}

export default getBlockRelation