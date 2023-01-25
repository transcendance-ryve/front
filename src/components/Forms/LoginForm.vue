<script setup lang="ts">
	import { reactive, computed, onMounted } from 'vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import useVuelidate from '@vuelidate/core'
	import { required, email, minLength, helpers } from '@vuelidate/validators'
	import { logoProfile, logoLock, logo42 } from '../../assets/logoSVG'
	import { auth42 } from '@/requests/Auth/auth42'
	import type { LoginForm } from '@/types/Forms'
	import { useNotifStore } from '@/stores/NotificationsStore'

	const	formData: LoginForm = reactive({
		email: '',
		password: '',
	})

	const	rules = computed(() => {
		return {
			email: {
				required: helpers.withMessage('Please enter a Please enter an email address', required),
				email: helpers.withMessage('Please enter a properly formatted email address', email)
			},
			password: {
				required: helpers.withMessage('Please enter a password', required),
				minLength: helpers.withMessage('Password is too short (6 min)', minLength(6)),
			},
		}
	})

	const	v$ = useVuelidate(rules, formData)
	const	emit = defineEmits(['login'])
	const	{ addNotif } = useNotifStore()

	const	submitForm = async () => {
		const    result = await v$.value.$validate();
		if (result)
			emit('login', formData.email, formData.password)
		else
			addNotif('error', 'Error', 'Invalid form')
	}

	onMounted(() => {
		const	input: HTMLElement = document.getElementById('Email')?.children[0] as HTMLElement
		input.focus()
	})

</script>

<template>
	<main class="Form-wrap">
		<button class="Form-42btn" @click.prevent="auth42">
			<span class="Btn-value">Sign in with</span>
			<span class="Form-42btn-logo" v-html="logo42"></span>
		</button>
		<span class="or">OR</span>
		<h1>Welcome back!</h1>
		<form @submit.prevent="submitForm">
			<div class="Form-inputsWrap">
				<BaseInput
					id="Email"
					v-model="formData.email"
					placeholder="Email"
					type="email"
					:logo="logoProfile"
				/>
				<span
					class="form-error"
					v-if="v$.email.$error"
				>
					{{ v$.email.$errors[0].$message }}
				</span>
				<BaseInput
					v-model="formData.password"
					placeholder="Password"
					type="password"
					:logo="logoLock"
				/>
				<span
					class="form-error"
					v-if="v$.password.$error"
				>
					{{ v$.password.$errors[0].$message }}
				</span>
			</div>
			<button
				class="Form-submitBtn"
				type="submit"
			>
				<span class="Btn-value">Sign in</span>
			</button>
		</form>
	</main>

</template>