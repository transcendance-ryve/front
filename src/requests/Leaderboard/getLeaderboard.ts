import useAxios from '@/requests/useAxios'
import router from '@/router'

export type leaderboardData = { users: [], usersCount: number, loadingData: boolean, err: null }
export type leaderboardQueries = { page: string, take: string, sort: string, order: string, search: string }
export type queriesKeys = 'page' | 'take' | 'sort' | 'order' | 'search'

const getLeaderboard = async (queries: leaderboardQueries, data: leaderboardData) => {

	console.log('route in axios = ', router.currentRoute.value.fullPath)
	await router.replace({ path: router.currentRoute.value.fullPath, query: queries})

	const	path = router.currentRoute.value.fullPath
	let	queriesToUrl: string = path.substring(path.indexOf('?'), path.length)
	queriesToUrl = queriesToUrl == path ? '' : queriesToUrl
	// console.log('okokokokok = ', queries)
	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users/leaderboard/' + queriesToUrl
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.users = response.value.users
		data.usersCount = response.value.usersCount
	}
}

export default getLeaderboard