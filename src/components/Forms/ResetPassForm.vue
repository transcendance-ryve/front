<script setup lang="ts">
	import { reactive, computed, onMounted } from 'vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import useVuelidate from '@vuelidate/core'
	import {
		required,
		minLength,
		sameAs,
		helpers
	} from '@vuelidate/validators'
	import { logoLock } from '../../assets/logoSVG'
	import type { ResetPasswordForm } from '@/types/Forms'
	import { useNotifStore } from '@/stores/NotificationsStore'

	const	formData: ResetPasswordForm = reactive({
		password: '',
		confirmPassword: ''
	})

	const	rules = computed(() => {
		return {
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
	const	emit = defineEmits(['resetPassword'])
	const	{ addNotif } = useNotifStore()

	const	submitForm = async () => {
		const	result = await v$.value.$validate();
		if (result)
			emit('resetPassword', formData.password)
		else
			addNotif('error', 'Error', 'Invalid form')
	}

	onMounted(() => {
		const	input: HTMLElement = document.getElementById('Password')?.children[0] as HTMLElement
		input.focus()
	})

</script>

<template>
	<main class="Form-wrap">
		<h1>Reset your password</h1>
		<form @submit.prevent="submitForm">
			<div class="Form-inputsWrap">
				<BaseInput
					id="Password"
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
				<span class="Btn-value">Reset</span>
			</button>
		</form>
	</main>

</template>