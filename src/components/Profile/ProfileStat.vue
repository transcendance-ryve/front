<script setup lang="ts">

	import { withDefaults } from 'vue'

	interface Props {
		index: number
		value: number
	}

	withDefaults(defineProps<Props>(), {
		index: 0,
		value: 0
	})

	const	labels: string[] = [
		'Ranking points',
		'Play count',
		'W/L Ratio',
		'Match won',
		'Lost game'
	]

</script>

<template>

	<div class="ProfileStat">
		<label class="ProfileStat-label">{{ labels[index] }}</label>
		<span class="ProfileStat-value">{{ value }}</span>
	</div>

</template>
