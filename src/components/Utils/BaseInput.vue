<script setup lang="ts">

	defineProps({
		inputType: {
			type: Number,
			default: 0,
		},
		label: {
			type: [String, Boolean],
			default: false,
		},
		modelValue: {
			type: [String, Number],
			default: '',
		},
		inputBackground: {
			type: String,
			default: '#1F1E2C',
		},
		logo: {
			type: [String, Boolean],
			default: false,
		},
		logoSize: {
			type: String,
			default: '24rem',
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
		inputFont: {
			type: String,
			default: '500 18rem \'Poppins\'',
		}
	})



</script>

<template>

	<div
		class="input-wrap"
		:class="{
			'input-wrap--S': inputType == 1,
			'input-wrap--M': inputType == 2,
			'input-wrap--L': inputType == 3,
		}"
	>
		<label v-if="label">{{ label }}</label>
		<input
			type="text"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			v-bind="$attrs"
		>
		<span v-if="logo" class="inputLogo" v-html="logo"></span>
		<!-- $attrs  to get all attributs gived by the parents (optionnal) -->
	</div>

</template>

<style lang="scss" scoped>

	.input-wrap {
		input {
			width: calc(100% - calc(2 * v-bind(inputPadding) + v-bind(logoSize) + v-bind(inputGap)));
			height: v-bind(inputHeight);
			padding: 0 v-bind(inputPadding) 0
				calc(v-bind(inputPadding) + v-bind(logoSize) + v-bind(inputGap));
			font: v-bind(inputFont);
			gap: v-bind(inputGap);
			background: v-bind(inputBackground);
		}
		.inputLogo {
			width: v-bind(logoSize);
			height: v-bind(logoSize);
			left: v-bind(inputPadding);
			top: calc((v-bind(inputHeight) - v-bind(logoSize)) / 2);
		}
	}

</style>
