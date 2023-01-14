import useAxios from '@/requests/useAxios'
import router from '@/router'
import type { LeaderboardData, LeaderboardQueries } from '@/types/Leaderboard'

const	getQueriesInUrl = (path: string) => {
	return (path.substring(path.indexOf('?')))
}

const	replaceUrl = async (queries: Partial<LeaderboardQueries>) => {
	if (!queries.search)
		delete queries.search
	await router.push({ query: queries})
}

const	getLeaderboard = async (urlQueries: string, data: LeaderboardData) => {

	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users'
		+ urlQueries
		+ '&select=id,username,avatar,level,experience,next_level,rank_point,wins,loses,played'
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.users = response.value.users
		data.count = response.value.count
	}
}

export { getQueriesInUrl, replaceUrl, getLeaderboard }