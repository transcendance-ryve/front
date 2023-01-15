<template>
	<div class="win__container">
		<div class="win__content">
			<div v-if="win" class="win__content_brand win">
				<h1>Winner</h1>
				<h2>You won the game</h2>
			</div>
			<div v-if="!win" class="win__content_brand loose">
				<h1>Looser</h1>
				<h2>You loose the game</h2>
			</div>
			<Btn value="Back to matchmaking" width="240px" height="50px" :type=2 fontSize="18px" @click="handleClick" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import Btn from "@/components/Utils/Btn.vue";

	interface Props {
		win?: boolean;
		close: () => void;
	}

	const props = defineProps<Props>();

	const handleClick = () => {
		props.close();
	}

</script>