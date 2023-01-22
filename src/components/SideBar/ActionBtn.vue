<script setup lang="ts">

	import { withDefaults } from 'vue';
	import ToolTip from '../Utils/Tooltip.vue'

	export interface ActionBtnValue {
		name: string
		logo: string
		color: string
		toolTip: string
	}

	interface Props {
		logo: string
		hoverColor: string
		toolTip: string
		shift?: boolean
		gameRequest?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		shift: false,
		gameRequest: false
	})

</script>

<template>

	<button class="ActionBtn">
		<span class="ActionBtn-logo" v-html="logo"></span>
		<div class="ActionBtn-game" v-if="gameRequest">
			<button class="Game-btn" @click="$emit('classic')">Classic</button>
			<button class="Game-btn" @click="$emit('bonus')">Bonus</button>
		</div>
		<ToolTip :value="toolTip" :shiftR="shift"/>
	</button>

</template>

<style lang="scss" scoped>

	.ActionBtn:hover {
		background: v-bind(hoverColor);
		transition: background 150ms ease-in-out;
	}

</style>