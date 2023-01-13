<script setup lang="ts">	
	import { useContentStore } from '../../stores/ContentStore'
	import Game from '@/components/Play/Game.vue'
	import MatchMaking from '@/components/Play/MatchMaking.vue'
import { ref } from 'vue';
import { useUserStore } from '@/stores/UserStore';

	const userStore = useUserStore();
	const	contentStore = useContentStore()
	contentStore.state = 1
	const socket = userStore.socket;

	const matchmakingVisible = ref(true);

	const connect = () => {
		socket.emit("game_connect");
	}
	
	socket.on("game_connected", () => {
		matchmakingVisible.value = false;
	});
</script>

<template>
	<div class="mainContent-play">
		<Game />

		<MatchMaking v-if="matchmakingVisible" :toggle="() => connect()" />
	</div>
</template>
