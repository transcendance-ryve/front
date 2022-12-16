<script setup lang="ts">

	import { useContentStore } from '../../stores/ContentStore'

	const	contentStore = useContentStore()
	contentStore.state = 1

</script>

<template>

	<div class="mainContent-play">
		PONG
	</div>

</template>
