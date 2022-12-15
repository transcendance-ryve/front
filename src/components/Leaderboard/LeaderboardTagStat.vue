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

	// const	p = toRefs(props)

	// const	perCent = p.levelPerCent?.value?.toString() + '%'

</script>

<template>

	<div class="LeaderboardTag-Stat">
		<label class="Stat-label">{{ label }}</label>
		<span class="Stat-value">{{ value }}</span>
	</div>

</template>
