<script setup lang="ts">
	import { reactive, computed, onMounted } from 'vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import useVuelidate from '@vuelidate/core'
	import {
		required,
		minLength,
		helpers
	} from '@vuelidate/validators'
	import { logoQrCode } from '../../assets/logoSVG'
	import type { TfaForm } from '@/types/Forms'
	import { useNotifStore } from '@/stores/NotificationsStore'

	const	formData: TfaForm = reactive({
		code: '',
	})

	const	rules = computed(() => {
		return {
			code: {
				required: helpers.withMessage('Please enter your code', required),
				minLength: helpers.withMessage('Code is too short (6 min)', minLength(6)),
			}
		}
	})

	const	v$ = useVuelidate(rules, formData)
	const	emit = defineEmits(['tfaCode'])
	const	{ addNotif } = useNotifStore()

	const	submitForm = async () => {
		const	result = await v$.value.$validate();
		if (result)	{
			emit('tfaCode', formData.code)
		}
		else
			addNotif('error', 'Error', 'Invalid form')
	}

	const	updateCode2FA = (e:any) => {
		if (e.target.value.length >= 6)
			e.target.value = e.target.value.slice(0, 6)
	}

	onMounted(() => {
		const	input: HTMLElement = document.getElementById('Code')?.children[0] as HTMLElement
		input.focus()
	})

</script>

<template>

	<main class="Form-wrap">
		<h1>2FA</h1>
		<form @submit.prevent="submitForm">
			<div class="Form-inputsWrap">
				<BaseInput
					id="Code"
					v-model="formData.code"
					placeholder="Code"
					type="number"
					:logo="logoQrCode"
					@input="updateCode2FA"
				/>
				<span
					class="form-error"
					v-if="v$.code.$error"
				>
					{{ v$.code.$errors[0].$message }}
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