import useAxios from '@/requests/useAxios'
import router from '@/router'
import type { MatchHistoryData, MatchHistoryQueries } from '@/types/MatchHistory'

const	getQueriesInUrl = (path: string) => {
	return (path.substring(path.indexOf('?')))
}

const	replaceUrl = async (queries: Partial<MatchHistoryQueries>) => {
	if (!queries.search)
		delete queries.search
	await router.push({ query: queries})
}

const	getMatchHistory = async (urlQueries: string, userId: string, data: MatchHistoryData) => {

	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/game/history/' + userId + urlQueries,
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.games = response.value.games
		data.count = response.value.count
	}
}

export { getQueriesInUrl, replaceUrl, getMatchHistory }