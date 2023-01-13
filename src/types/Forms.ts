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

export interface ForgotPasswordForm {
	email: string;
}

export interface ResetPasswordForm {
	password: string;
	confirmPassword: string;
}

export interface TfaForm {
	code: string;
}
