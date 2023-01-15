import type { Players } from '@/types/User'

export interface Game {
	id: string,
	players: Players
}

export interface SpectateData {
	games: Game[],
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

export type queriesKeys = 'page' | 'take' | 'order' | 'search'