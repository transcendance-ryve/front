import useAxios from '@/requests/useAxios'

export type leaderboardData = { users: [], usersCount: number, loadingData: boolean, err: null }
export type leaderboardQueries = { limit: number, page: number, sortBy: string, order: string }

const getLeaderboard = async (queries: leaderboardQueries, data: leaderboardData) => {

	data.loadingData = true
	const { response, loading, error } = await useAxios(
		'get',
		'/users/leaderboard/'
	)
	data.loadingData = loading.value
	data.err = error.value
	if (!data.err) {
		data.users = response.value.users
		data.usersCount = response.value.usersCount
	}
}

export default getLeaderboard