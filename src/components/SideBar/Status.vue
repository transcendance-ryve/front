<script setup lang="ts">

	import { computed } from 'vue'

	const props = defineProps({
		status: {
			type: [String, Boolean],
			default: false,
		},
		users: {
			type: [Number, Boolean],
			default: false,
		}
	})

	const	statusClass = computed(() => {
		if (props.status == 'IN GAME')
			return 'Status--INGAME'
		else
		 return 'Status--' + props.status
	})

</script>

<template>

	<span
		v-if="status"
		class="Status"
		:class="statusClass"
	>
		<span class="Status-value">{{ status.toString().toLowerCase() }}</span>
	</span>
	<span
		v-else-if="users"
		class="Status--USERS"
	>
		<span class="Status-value">{{ users }} users</span>
	</span>

</template>