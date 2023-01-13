<script setup lang="ts">

	export interface Props {
		modelValue?: string | number
		inputBackground?: string
		logo?: string | boolean
		logoSize?: string
		inputHeight?: string
		inputPadding?: string
		inputGap?: string
		borderRadius?: string
		inputFont?: string
	}

	withDefaults(defineProps<Props>(), {
		modelValue: '',
		inputBackground: '#1F1E2C',
		logo: false,
		logoSize: '24em',
		inputHeight: '48em',
		inputPadding: '12em',
		inputGap: '12em',
		borderRadius: '6em',
		inputFont: '500 18em \'Poppins\'',
	})

</script>

<template>

	<div class="input-wrap">
		<input
			type="text"
			:value="modelValue"
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			v-bind="$attrs"
		>
		<span v-if="logo" class="inputLogo" v-html="logo"></span>
		<!-- $attrs  to get all attributs gived by the parents (optionnal) -->
	</div>

</template>

<style lang="scss" scoped>

	.input-wrap {
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
