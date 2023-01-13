<script setup lang="ts">

	import { withDefaults } from 'vue';

	interface Props {
		type?: number
		value?: string
		logo?: string | boolean
		fillLogo?: boolean
		fontSize?: string
		width?: string | boolean
		height?: string | boolean
	}

	const	props = withDefaults(defineProps<Props>(), {
		type: 1,
		value: '',
		logo: false,
		fillLogo: true,
		fontSize: '14em',
		width: false,
		height: false
	})

	const	classType: string = 'Btn1--type' + props.type

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