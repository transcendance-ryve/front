<template>
	<div class="win__container">
		<div class="win__content" v-if="state !== 'spectate'">
			<div v-if="state === 'win'" class="win__content_brand win">
				<h1>Winner</h1>
				<h2>You won the game</h2>
			</div>
			<div v-if="state === 'lose'" class="win__content_brand loose">
				<h1>Loser</h1>
				<h2>You loose the game</h2>
			</div>
			<Btn value="Back to matchmaking" width="240em" height="50em" fontSize="18em" @click="handleClick" />
		</div>
		<div v-if="state === 'spectate' && player" class="win__content_brand_spectate">
			<img :src="player.avatar" alt="avatar" :style="{'border': '4em solid ' + player.color}">
			<h1><span class="winner_name" :style="{'color': player.color}">{{ player?.username }}</span> won the game</h1>
			<Btn value="Leave spectate" width="200em" height="50em" fontSize="18em" @click="handleClick" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import Btn from "@/components/Utils/Btn.vue";
	import type { Player } from "@/types/User";

	interface Props {
		state?: string;
		player?: {
			username: string;
			avatar: string;
			color: string;
		} | undefined,
		close: () => void;
	}

	const props = defineProps<Props>();

	const handleClick = () => {
		props.close();
	}

</script>