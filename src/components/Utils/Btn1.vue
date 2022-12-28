<script setup lang="ts">

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
		width: {
			type: [String, Boolean],
			default: false,
		},
		height: {
			type: [String, Boolean],
			default: false,
		}
	})

	

</script>

<template>

	<button
		class="Btn1"
		:class="{
			'Btn1--type1': type == 1,
			'Btn1--type2': type == 2,
			'Btn1--type3': type == 3,
		}"
		@click="$emit('click')"
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
	}

</style>