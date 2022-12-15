<script setup lang="ts">

	import BaseInput from '../Utils/BaseInput.vue'
	import Status from './Status.vue'

	const props = defineProps({
		logo: {
			type: String,
		},
		hoverColor: {
			type: String,
		}
	})

</script>

<template>

	<button class="OptionBtn">
		<span class="OptionBtn-logo" v-html="logo"></span>
	</button>

</template>

<style lang="scss" scoped>

	.OptionBtn:hover {
		background: v-bind(hoverColor);
		transition: background 150ms ease-in-out;
	}

</style>