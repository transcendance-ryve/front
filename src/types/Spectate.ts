import type { Players } from './User';

export interface SpectateData {
	games: Players[],
	count: number,
	loadingData: boolean,
	err: null
}

export interface SpectateQueries {
	page: string,
	take: string,
	order: string,
	search: string
}

export type queriesKeys = 'page' | 'take' | 'sort' | 'order' | 'search'