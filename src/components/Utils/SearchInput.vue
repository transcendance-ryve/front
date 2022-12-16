<script setup lang="ts">

	import { ref, watch } from 'vue'
	import BaseInput from './BaseInput.vue'
	import { logoSearch } from '../../assets/logoSVG'

	defineProps({
		inputType: {
			type: Number,
			default: 0,
		},
		inputBackground: {
			type: String,
			default: '#1F1E2C',
		},
		inputHeight: {
			type: String,
			default: '48rem',
		},
		inputFont: {
			type: String,
			default: '500 18rem \'Poppins\''
		},
		logoSize: {
			type: String,
			default: '24rem'
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
		class="SearchInput"
		v-model="input"
		placeholder="Search"
		:inputType="inputType"
		:logo="logoSearch"
		:logoSize="logoSize"
		:logoSizeIn="logoSizeIn"
		:inputBackground="inputBackground"
		:inputHeight="inputHeight"
		:inputHeightOut="inputHeightOut"
		:inputFont="inputFont"
	/>

</template>
