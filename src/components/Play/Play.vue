<script setup lang="ts">

	import { useNavBarStore } from '../../stores/NavBarStore'

	const	nbStore = useNavBarStore()
	nbStore.nbState = 1

</script>

<template>

	<div class="mainContent-play">
		PONG
	</div>

</template>
