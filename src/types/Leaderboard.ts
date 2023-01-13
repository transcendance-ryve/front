export interface leaderboardData {
	users: any[],
	count: number,
	loadingData: boolean,
	err: null
}

export interface leaderboardQueries {
	page: string,
	take: string,
	sort: string,
	order: string,
	search: string
}

export type queriesKeys = 'page' | 'take' | 'sort' | 'order' | 'search'