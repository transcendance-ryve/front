import type { User } from './User'

export interface ProfileData {
	user: User,
	type: number,
	loadingData: boolean,
	err: any
}