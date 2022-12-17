<script setup lang="ts">

	import { ref, watch } from 'vue'
	import BaseInput from './BaseInput.vue'
	import { logoSearch } from '../../assets/logoSVG'

	defineProps({
		inputBackground: {
			type: String,
			default: '#1F1E2C',
		},
		logoSize: {
			type: String,
			default: '24rem'
		},
		inputWidth: {
			type: String,
			default: '100%',
		},
		inputHeight: {
			type: String,
			default: '48rem',
		},
		inputPadding: {
			type: String,
			default: '12rem',
		},
		inputGap: {
			type: String,
			default: '8rem',
		},
		borderRadius: {
			default: '6rem'
		},
		inputFont: {
			type: String,
			default: '500 18rem \'Poppins\''
		}
	})

	const	input = ref('')
	const	isWriting = ref(false)
	let		timer: number
	const	emit = defineEmits(['search'])

	watch(input, newVal => {
		if (isWriting.value)
			clearTimeout(timer)
		else
			isWriting.value = true
		timer = setTimeout(() => {
			isWriting.value = false
			emit('search', input.value)
		}, 600)
	})

</script>

<template>

	<BaseInput
		
		v-model="input"
		placeholder="Search"
		:logo="logoSearch"
		:logoSize="logoSize"
		:inputWidth="inputWidth"
		:inputHeight="inputHeight"
		:inputBackground="inputBackground"
		:inputPadding="inputPadding"
		:inputGap="inputGap"
		:borderRadius="borderRadius"
		:inputFont="inputFont"
	/>

</template>
