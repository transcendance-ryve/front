<script setup lang="ts">

	import { toRefs } from 'vue'

	const	props = defineProps({
		label: {
			type: String
		},
		value: {
			type: Number
		},
	})

</script>

<template>

	<div class="LeaderboardTag-Stat">
		<label class="Stat-label">{{ label }}</label>
		<div class="Stat-valueWrap">
			<span class="Stat-value">{{ value }}</span>
		</div>
	</div>

</template>
