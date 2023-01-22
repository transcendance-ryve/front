<script setup lang="ts">
	import { reactive, computed, onMounted } from 'vue'
	import BaseInput from '@/components/Utils/BaseInput.vue'
	import useVuelidate from '@vuelidate/core'
	import { required, email, helpers } from '@vuelidate/validators'
	import { logoEmail } from '../../assets/logoSVG'
	import type { ForgotPasswordForm } from '@/types/Forms'

	const	formData: ForgotPasswordForm = reactive({
		email: '',
	})

	const	rules = computed(() => {
		return {
			email: {
				required: helpers.withMessage('Please enter an email address', required),
				email: helpers.withMessage('Please enter a properly formatted email address', email)
			},
		}
	})

	const	v$ = useVuelidate(rules, formData)

	const	emit = defineEmits(['forgotPassword'])

	const	submitForm = async () => {
		const	result = await v$.value.$validate();
		if (result)
			emit('forgotPassword', formData.email)
		else
			alert('error, form not submitted')
	}

	onMounted(() => {
		const	input: HTMLElement = document.getElementById('Email')?.children[0] as HTMLElement
		input.focus()
	})

</script>

<template>
	<main class="Form-wrap">
		<h1>Forgot password</h1>
		<form @submit.prevent="submitForm">
			<div class="Form-inputsWrap">
				<BaseInput
					id="Email"
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
			</div>
			<button
				class="Form-submitBtn"
				type="submit"
			>
				<span class="Btn-value">Send code</span>
			</button>
		</form>
	</main>

</template>