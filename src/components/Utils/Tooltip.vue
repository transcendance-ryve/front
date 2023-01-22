<script setup lang="ts">

	import { withDefaults } from 'vue';

	interface Props {
		value?: string
		backgroundColor?: string
		toolTipHeight?: string
		toolTipPadding?: string
		borderRadius?: string
		toolTipFont?: string
		dist?: string
		shiftR?: boolean
		shiftL?: boolean
	}

	withDefaults(defineProps<Props>(), {
		value: '',
		backgroundColor: '#1F1E2C',
		toolTipHeight: '30em',
		toolTipPadding: '8em',
		borderRadius: '6em',
		toolTipFont: '500 14em \'Poppins\'',
		dist: '12em',
		shiftR: false,
		shiftL: false
	})

</script>

<template>

	<div class="ToolTip" :class="{'Tooltip--shiftR': shiftR, 'Tooltip--shiftL': shiftL}">
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