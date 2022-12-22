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
			default: '30em',
		},
		toolTipPadding: {
			type: String,
			default: '8em',
		},
		borderRadius: {
			type: String,
			default: '6em',
		},
		toolTipFont: {
			type: String,
			default: '500 14em \'Poppins\'',
		},
		dist: {
			type: String,
			default: '12em',
		},
		shift: {
			type: Boolean,
			default: false
		}
	})

	

</script>

<template>

	<div class="ToolTip" :class="{'Tooltip--shift': shift}">
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