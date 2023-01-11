<script setup lang="ts">
	import { reactive, computed, onMounted } from 'vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import useVuelidate from '@vuelidate/core'
	import {
		required,
		minLength,
		helpers
	} from '@vuelidate/validators'
	import { logoProfile, logoLock, logo42 } from '../../assets/logoSVG'
	import { auth42 } from '@/requests/Auth/auth42'
	import router from '@/router'


	const	formData = reactive({
		id: '',
		password: '',
	})

	const	rules = computed(() => {
		return {
			id: {        //    custom error msg with helpers.withMessage
				required: helpers.withMessage('Please enter a username', required),
			},
			password: {
				required: helpers.withMessage('Please enter a password', required),
				minLength: helpers.withMessage('Password is too short (6 min)', minLength(6)),
			},
		}
	})

	const	v$ = useVuelidate(rules, formData)

	const	emit = defineEmits(['login'])

	const	submitForm = async () => {
		const    result = await v$.value.$validate();
		if (result)    {
			emit('login', formData.id, formData.password)
		}
		else
			alert('error, form not submitted')
	}

	onMounted(() => {
		const	input: HTMLElement = document.getElementById('UserName')?.children[0] as HTMLElement
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
					id="UserName"
					v-model="formData.id"
					placeholder="Username or Email"
					:logo="logoProfile"
				/>
				<span
					class="form-error"
					v-if="v$.id.$error"
				>
					{{ v$.id.$errors[0].$message }}
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
			<button class="Form-forgotBtn" type="button" @click="router.push({path: '/accounts/forgot-password'})">
				<span class="ForgotBtn-value">Forgot your password?</span>
			</button>
			<button
				class="Form-submitBtn"
				type="submit"
			>
				<span class="Btn-value">Sign in</span>
			</button>
		</form>
	</main>

</template>