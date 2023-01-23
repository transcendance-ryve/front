<script setup lang="ts">

	import { withDefaults, computed } from 'vue'

	interface Props {
		status?: string | boolean
		users?: number | boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		status: false,
		users: false,
	})

	const	statusClass = computed(() => {
		if (props.status === 'IN GAME')
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