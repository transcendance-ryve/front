<script setup lang="ts">

	import { withDefaults, ref, toRefs, watch, type Ref } from 'vue'
	import BaseInput from './BaseInput.vue'
	import { logoSearch } from '../../assets/logoSVG'

	interface Props {
		defaultValue?: string,
		inputBackground?: string,
		inputHeight?: string,
		borderRadius?: string,
	}

	const	props = withDefaults(defineProps<Props>(), {
		defaultValue: '',
		inputBackground: '#1F1E2C',
		inputHeight: '48em',
		borderRadius: '6em'
	})

	const	p = toRefs(props)

	const	input: Ref<string> = ref(p.defaultValue.value.substring(0))
	let		isWriting: boolean = false
	let		timer: number
	const	emit: any = defineEmits(['search'])
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
