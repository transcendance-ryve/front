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
		if (p.status?.value == 'In Game')
			return 'Status--inGame'
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
		<span class="Status-value">{{ status }}</span>
	</span>
	<span
		v-else-if="users"
		class="Status--users"
	>
		<span class="Status-value">{{ users }} users</span>
	</span>

</template>