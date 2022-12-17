<script setup lang="ts">

	defineProps({
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
			default: '500 18rem \'Poppins\'',
		}
	})



</script>

<template>

	<div class="input-wrap">
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
			width: v-bind(inputWidth);
			min-height: v-bind(inputHeight);
			padding: 0 v-bind(inputPadding) 0
				calc(v-bind(inputPadding) + v-bind(logoSize) + v-bind(inputGap));
			background: v-bind(inputBackground);
			border-radius: v-bind(borderRadius);
		input {
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
