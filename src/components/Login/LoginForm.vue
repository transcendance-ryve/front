<script setup lang="ts">
	import { reactive, computed } from 'vue'
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
	import { logoProfile, logoLock, logo42 } from '../../assets/logoSVG'

	const	formData = reactive({
		id: '',
		password: '',
	})

	const	rules = computed(() => {
		return {
			id: {		//	custom error msg with helpers.withMessage
				required: helpers.withMessage('Please enter a username', required),
			},
			password: {
				required: helpers.withMessage('Please enter a password', required),
				minLength: helpers.withMessage('Password is too short (6 min)', minLength(6)),
			},
		}
	})

	const	v$ = useVuelidate(rules, formData)

	const	emit = defineEmits(['success'])

	const	submitForm = async () => {
		const	result = await v$.value.$validate();
		if (result)	{
			emit('success', formData.id, formData.password)
		}
		else
			alert('error, form not submitted')
	}

</script>

<template>
	<main>
		<div class="form-wrap">

			<button class="Form-42btn">
				<span class="Btn-value">Sign up with</span>
				<span class="Form-42btn-logo" v-html="logo42"></span>
			</button>
			<span class="or">OR</span>
			<h1>Welcome back!</h1>
			<form @submit.prevent="submitForm">
				<div class="Form-inputsWrap">
					<BaseInput
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
				<button class="Form-forgotBtn">
					<span class="ForgotBtn-value">Forgot your password?</span>
				</button>
				<button
					class="Form-submitBtn"
					type="submit"
				>
					<span class="Btn-value">Sign in</span>
				</button>
			</form>
		</div>
	</main>

</template>