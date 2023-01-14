import useAxios from '@/requests/useAxios'
import router from '@/router'
import type { SpectateData } from '@/types/Spectate'

// const	getQueriesInUrl = (path: string) => {
// 	return (path.substring(path.indexOf('?')))
// }

// const	replaceUrl = async (queries: Partial<LeaderboardQueries>) => {
// 	if (!queries.search)
// 		delete queries.search
// 	await router.push({ query: queries})
// }

const	getSpectate = async (data: SpectateData) => {

	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/game/current'
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		console.log('spectate response', response.value)
		// data.users = response.value.users
		// data.count = response.value.count
	}
}

// export { getQueriesInUrl, replaceUrl, getSpectate }
export { getSpectate }