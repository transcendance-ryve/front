<script setup lang="ts">

	import { ref, watch } from 'vue'
	import BaseInput from './BaseInput.vue'
	import { logoSearch } from '../../assets/logoSVG'

	defineProps({
		inputBackground: {
			type: String,
			default: '#1F1E2C',
		},
		inputHeight: {
			type: String,
			default: '48em',
		},
		borderRadius: {
			default: '6em'
		},
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
		:inputHeight="inputHeight"
		:inputBackground="inputBackground"
		borderRadius="6em"
	/>

</template>
