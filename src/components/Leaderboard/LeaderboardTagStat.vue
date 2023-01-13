<script setup lang="ts">

	interface props {
		label: string
		value: number
	}

	defineProps<props>()

</script>

<template>

	<div class="LeaderboardTag-Stat">
		<label class="Stat-label">{{ label }}</label>
		<div class="Stat-valueWrap">
			<span class="Stat-value">{{ value }}</span>
		</div>
	</div>

</template>
