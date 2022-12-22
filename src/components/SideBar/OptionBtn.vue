<script setup lang="ts">

	import ToolTip from '../Utils/Tooltip.vue'

	const props = defineProps({
		logo: {
			type: String,
		},
		hoverColor: {
			type: String,
		},
		toolTip: {
			type: String,
		},
		shift: {
			type: Boolean,
			default: false
		}
	})

</script>

<template>

	<button class="OptionBtn">
		<span class="OptionBtn-logo" v-html="logo"></span>
		<ToolTip :value="toolTip" :shift="shift"/>
	</button>

</template>

<style lang="scss" scoped>

	.OptionBtn:hover {
		background: v-bind(hoverColor);
		transition: background 150ms ease-in-out;
	}

</style>