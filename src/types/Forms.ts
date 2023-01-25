export interface RegisterForm {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface LoginForm {
	email: string;
	password: string;
}

export interface TfaForm {
	code: string;
}

export interface SettingsForm {
	avatar: null,
	avatarFile: File | null,
	username: string,
	oldPassword: string,
	newPassword: string,
	confirmPassword: string,
	code2FA: string,
	state2FA: boolean
}

export interface CreateChanForm {
	name: string
	status: string,
	avatar: null,
	avatarFile: File | null,
	password: string
	invitees: string[]
}

export interface EditChanForm {
	id: string,
	name: string
	status: string,
	avatar: null,
	avatarFile: File | null,
	password: string
}