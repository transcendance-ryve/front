<script setup lang="ts">

	import { useContentStore } from '../../stores/ContentStore'
	import MatchMaking from '@/components/Play/MatchMaking.vue'

	const	contentStore = useContentStore()
	contentStore.state = 1

</script>

<template>

	<div class="mainContent-play">
		<MatchMaking />
	</div>

</template>
