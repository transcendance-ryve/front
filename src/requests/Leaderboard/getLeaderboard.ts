import useAxios from '@/requests/useAxios'
import router from '@/router'

export type leaderboardData = { users: [], count: number, loadingData: boolean, err: null }
export type leaderboardQueries = { page: string, take: string, sort: string, order: string, search: string }
export type queriesKeys = 'page' | 'take' | 'sort' | 'order' | 'search'

const getLeaderboard = async (queries: Partial<leaderboardQueries>, data: leaderboardData) => {

	if (!queries.search)
		delete queries.search
	await router.replace({ path: router.currentRoute.value.fullPath, query: queries})

	const	path = router.currentRoute.value.fullPath
	let	queriesToUrl: string = path.substring(path.indexOf('?'), path.length)
	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users'
		+ queriesToUrl
		+ '&select=id,username,avatar,level,experience,nextLevel,rankPoint,wins,loses,played'
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.users = response.value.users
		data.count = response.value.count
	}
}

export default getLeaderboard