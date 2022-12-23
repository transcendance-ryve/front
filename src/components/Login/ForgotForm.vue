<script setup lang="ts">
	import { reactive, computed } from 'vue'
	import BaseInput from '@/components/Utils/BaseInput.vue'
	import useVuelidate from '@vuelidate/core'
	import {
		required,
		email,
		helpers
	} from '@vuelidate/validators'
	import { logoEmail } from '../../assets/logoSVG'

	const	formData = reactive({
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

	const	emit = defineEmits(['success'])

	const	submitForm = async () => {
		const	result = await v$.value.$validate();
		if (result)	{
			emit('success', formData.email)
		}
		else
			alert('error, form not submitted')
	}

</script>

<template>
	<main class="form-wrap">
		<h1>Forgot password</h1>
		<form @submit.prevent="submitForm">
			<div class="Form-inputsWrap">
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