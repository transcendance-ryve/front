<script setup lang="ts">

	const props = defineProps({
		value: {
			type: String,
			default: '',
		},
		backgroundColor: {
			type: String,
			default: '#1F1E2C'
		},
		toolTipHeight: {
			type: String,
			default: '30rem',
		},
		toolTipPadding: {
			type: String,
			default: '8rem',
		},
		borderRadius: {
			type: String,
			default: '6rem',
		},
		toolTipFont: {
			type: String,
			default: '500 14rem \'Poppins\'',
		},
		dist: {
			type: String,
			default: '12rem',
		}
	})

	

</script>

<template>

	<div class="ToolTip">
		<span class="ToolTip-value">{{ value }}</span>
	</div>

</template>

<style lang="scss" scoped>

	.ToolTip {
		height: v-bind(toolTipHeight);
		padding: 0 v-bind(toolTipPadding);
		background: v-bind(backgroundColor);
		border-radius: v-bind(borderRadius);
		top: calc(100% + v-bind(dist));

		.ToolTip-value {
			font: v-bind(toolTipFont);
		}
	}

</style>