<script setup lang="ts">
	import { toRefs } from 'vue'


	const props = defineProps({
		type: {
			type: Number,
			default: 1
		},
		value: {
			type: String,
			default: '',
		},
		logo: {
			type: [String, Boolean],
			default: false,
		},
		fillLogo: {
			type: [Boolean],
			default: true,
		},
		fontSize: {
			type: String,
			default: '14em',
		},
		width: {
			type: [String, Boolean],
			default: false,
		},
		height: {
			type: [String, Boolean],
			default: false,
		}
	})

	const p = toRefs(props)

	const	classType: string = 'Btn1--type' + p.type.value

</script>

<template>

	<button
		class="Btn1"
		:class=classType
	>
		<span
			class="Btn1-logo"
			:class="{'Logo--fill': fillLogo == true}"
			v-if="logo" v-html="logo"
		>
		</span>
		<span class="Btn1-value">{{ value }}</span>
	</button>

</template>

<style lang="scss" scoped>

	.Btn1 {
		width: v-bind(width);
		height: v-bind(height);

		.Btn1-value {
			font-size: v-bind(fontSize)
		}
	}

</style>