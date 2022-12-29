import useAxios from '@/requests/useAxios'
import router from '@/router'

export type leaderboardData = { users: [], usersCount: number, loadingData: boolean, err: null }
export type leaderboardQueries = { page: number, take: number, sort: string, order: string }

const getLeaderboard = async (data: leaderboardData) => {

	console.log('route in axios = ', router.currentRoute.value.fullPath)
	const	path = router.currentRoute.value.fullPath
	let	queries: string = path.substring(path.indexOf('?'), path.length)
	queries = queries == path ? '' : queries
	// console.log('okokokokok = ', queries)
	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users/leaderboard/' + queries
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.users = response.value.users
		data.usersCount = response.value.usersCount
	}
}

export default getLeaderboard