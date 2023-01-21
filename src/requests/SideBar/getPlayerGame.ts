import useAxios from '@/requests/useAxios'

const getPlayerGame = async (targetId: string) => {
	const { response, loading, error } = await useAxios(
		'get',
		'/game/playerGame/' + targetId,
	)
	if (error.value) {
		//	handle errors
	}
	else if (response.value) {
		return response.value
	}
}

export default getPlayerGame