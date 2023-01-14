import type { User } from './User';

export interface LeaderboardData {
	users: User[],
	count: number,
	loadingData: boolean,
	err: null
}

export interface LeaderboardQueries {
	page: string,
	take: string,
	sort: string,
	order: string,
	search: string
}

export type queriesKeys = 'page' | 'take' | 'sort' | 'order' | 'search'