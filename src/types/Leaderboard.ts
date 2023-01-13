import type { User } from './User';

export interface leaderboardData {
	users: User[],
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