import type { Players } from './User';

export interface MatchHistoryData {
	games: Players[],
	count: number,
	loadingData: boolean,
	err: null
}

export interface MatchHistoryQueries {
	page: string,
	take: string,
	order: string,
	search: string
}

export type queriesKeys = 'page' | 'take' | 'order' | 'search'