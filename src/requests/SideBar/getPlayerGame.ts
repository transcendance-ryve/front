import useAxios from '@/requests/useAxios'

const getPlayerGame = async (targetId: string) => {
	const { response, error } = await useAxios(
		'get',
		'/game/playerGame/' + targetId,
	)
	if (!error.value)
		return response.value
}

export default getPlayerGame