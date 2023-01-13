export type userKeys = 'id' | 'username' | 'avatar' | 'status' | 'level' | 'experience' | 'next_level' | 'rank_point' | 'wins' | 'loses' | 'played'

export interface UserConnected {
	auth: boolean;
	avatar: string;
	email: string;
	experience: number;
	id: string;
	level: number;
	loses: number;
	next_level: number;
	played: number;
	rank_point: number;
	status: string;
	tfa_enabled: boolean;
	username: string;
	wins: number;
}

export interface User {
	id: string;
	username: string;
	avatar: string;
	status: string;
	level: number;
	experience: number;
	next_level: number;
	rank_point: number;
	wins: number;
	loses: number;
	played: number;
}