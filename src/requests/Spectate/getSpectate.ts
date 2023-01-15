import useAxios from '@/requests/useAxios'
import router from '@/router'
import type { SpectateData } from '@/types/Spectate'

const	getSpectate = async (data: SpectateData) => {

	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/game/current'
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.gamesData = response.value
	}
}

export { getSpectate }