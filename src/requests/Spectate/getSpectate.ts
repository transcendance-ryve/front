import useAxios from '@/requests/useAxios'
import router from '@/router'
import type { SpectateData, SpectateQueries } from '@/types/Spectate'

const	getQueriesInUrl = (path: string, page: number) => {
	return (path.substring(path.indexOf('?'))) + '&page=' + page.toString()
}

const	replaceUrl = async (queries: Partial<SpectateQueries>) => {
	if (!queries.search)
		delete queries.search
	await router.push({ query: queries})
}

const	getSpectate = async (urlQueries: string, data: SpectateData) => {

	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/game/current'
		+ urlQueries + '&take=15'
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		console.log('response in get spectate', response.value)
		data.games = data.games.concat(response.value.res)
		data.count = response.value.count
	}
}

export { getQueriesInUrl, replaceUrl, getSpectate }