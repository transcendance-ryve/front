<script setup lang="ts">

	import { ref, toRefs, watch } from 'vue'
	import BaseInput from './BaseInput.vue'
	import { logoSearch } from '../../assets/logoSVG'

	const	props = defineProps({
		defaultValue: {
			type: String,
			default: '',
		},
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

	const	p = toRefs(props)

	const	input = ref(p.defaultValue.value.substring(0))
	let		isWriting = false
	let		timer: number
	const	emit = defineEmits(['search'])
	let		updateInput: boolean = false

	watch(p.defaultValue, () => {
		updateInput = true
		input.value = p.defaultValue.value
		updateInput = false
	})

	watch(input, () => {
		if (updateInput)
			return
		if (isWriting)
			clearTimeout(timer)
		else
			isWriting = true
		timer = setTimeout(() => {
			isWriting = false
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
