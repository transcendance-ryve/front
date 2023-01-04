<script setup lang="ts">

	import { toRefs, computed } from 'vue'

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

	const p = toRefs(props);

	const	statusClass = computed(() => {
		if (p.status?.value == 'IN GAME')
			return 'Status--INGAME'
		else
		 return 'Status--' + p.status?.value
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