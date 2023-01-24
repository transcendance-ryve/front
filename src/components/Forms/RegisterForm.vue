<script setup lang="ts">
	import { reactive, computed, onMounted } from 'vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import useVuelidate from '@vuelidate/core'
	import {
		required,
		minLength,
		maxLength,
		email,
		sameAs,
		helpers
	} from '@vuelidate/validators'
	import { logoProfile, logoEmail, logoLock, logo42 } from '../../assets/logoSVG'
	import { auth42 } from '@/requests/Auth/auth42'
	import type { RegisterForm } from '@/types/Forms'
	import { useNotifStore } from '@/stores/NotificationsStore'

	const	formData: RegisterForm = reactive({
		username: '',
		email: '',
		password: '',
		confirmPassword: ''
	})

	const	rules = computed(() => {
		return {
			username: {
				required: helpers.withMessage('Please enter a username', required),
				minLength: helpers.withMessage('Username is too short (4 min)', minLength(4)),
				maxLength: helpers.withMessage('Username is too long (18 max)', maxLength(18))
			},
			email: {
				required: helpers.withMessage('Please enter an email address', required),
				email: helpers.withMessage('Please enter a properly formatted email address', email)
			},
			password: {
				required: helpers.withMessage('Please enter a password', required),
				minLength: helpers.withMessage('Password is too short (6 min)', minLength(6)),
			},
			confirmPassword: {
				required: helpers.withMessage('Please confirm your password', required),
				sameAs: helpers.withMessage('Incorrect password', sameAs(formData.password))
			}
		}
	})

	const	v$ = useVuelidate(rules, formData)
	const	emit = defineEmits(['register'])
	const	{ addNotif } = useNotifStore()

	const	submitForm = async () => {
		const	result = await v$.value.$validate();
		if (result)
			emit('register', formData.username, formData.email, formData.password)
		else
			addNotif('error', 'Error', 'Invalid form')
	}

	onMounted(() => {
		const	input: HTMLElement = document.getElementById('UserName')?.children[0] as HTMLElement
		input.focus()
	})

</script>

<template>
	<div class="Form-wrap">
		<button class="Form-42btn" @click.prevent="auth42">
			<span class="Btn-value">Sign up with</span>
			<span class="Form-42btn-logo" v-html="logo42"></span>
		</button>
		<span class="or">OR</span>
		<h1>Create an account</h1>
		<form @submit.prevent="submitForm">
			<div class="Form-inputsWrap">
				<BaseInput
					id="UserName"
					v-model="formData.username"
					placeholder="Username"
					:logo="logoProfile"
				/>
				<span
					class="form-error"
					v-if="v$.username.$error"
				>
					{{ v$.username.$errors[0].$message }}
				</span>
				<BaseInput
					v-model="formData.email"
					placeholder="Email"
					type="email"
					:logo="logoEmail"
				/>
				<span
					class="form-error"
					v-if="v$.email.$error"
				>
					{{ v$.email.$errors[0].$message }}
				</span>
				<BaseInput
					v-model="formData.password"
					placeholder="Choose password"
					type="password"
					:logo="logoLock"
				/>
				<span
					class="form-error"
					v-if="v$.password.$error"
				>
					{{ v$.password.$errors[0].$message }}
				</span>
				<BaseInput
					v-model="formData.confirmPassword"
					placeholder="Confirm password"
					type="password"
					:logo="logoLock"
				/>
				<span
					class="form-error"
					v-if="v$.confirmPassword.$error"
				>
					{{ v$.confirmPassword.$errors[0].$message }}
				</span>
			</div>
			<button
				class="Form-submitBtn"
				type="submit"
			>
				<span class="Btn-value">Register</span>
			</button>
		</form>
	</div>

</template>