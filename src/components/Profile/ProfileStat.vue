<script setup lang="ts">

	const props = defineProps({
		ind: {
			type: Number
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
		<label class="ProfileStat-label">{{ labels[ind] }}</label>
		<span class="ProfileStat-value">{{ value }}</span>
	</div>

</template>
