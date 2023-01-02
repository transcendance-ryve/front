import useAxios from '@/requests/useAxios'
import router from '@/router'

export type leaderboardData = { users: [], count: number, loadingData: boolean, err: null }
export type leaderboardQueries = { page: string, take: string, sort: string, order: string, search: string }
export type queriesKeys = 'page' | 'take' | 'sort' | 'order' | 'search'


const	getQueriesInUrl = (path: string) => {
	return (path.substring(path.indexOf('?')))
}

const	replaceUrl = async (queries: Partial<leaderboardQueries>) => {
	if (!queries.search)
		delete queries.search
	await router.push({ query: queries})
}

const getLeaderboard = async (urlQueries: string, data: leaderboardData) => {

	// const	path = router.currentRoute.value.fullPath
	// console.log('path in get', path)
	// const	urlqueries: string = path.substring(path.indexOf('?'), path.length)

	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users'
		+ urlQueries
		+ '&select=id,username,avatar,level,experience,nextLevel,rankPoint,wins,loses,played'
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.users = response.value.users
		data.count = response.value.count
	}
}

export { getQueriesInUrl, replaceUrl, getLeaderboard }