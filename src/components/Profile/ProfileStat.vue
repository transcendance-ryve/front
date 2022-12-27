<script setup lang="ts">

	const props = defineProps({
		index: {
			type: Number,
			default: 0
		},
		value: {
			type: Number
		}
	})

	const	labels = [
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
