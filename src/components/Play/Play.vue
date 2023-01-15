<script setup lang="ts">	
	import { useContentStore } from '../../stores/ContentStore'
	import Game from '@/components/Play/Game.vue'
	import MatchMaking from '@/components/Play/MatchMaking.vue'
	import Win from '@/components/Play/Win.vue'
	import { ref, reactive, onMounted, onUnmounted } from 'vue'
	import { useUserStore } from '@/stores/UserStore'
	import type { UserConnected } from '@/types/User'

	const userStore = useUserStore();
	const	contentStore = useContentStore()
	contentStore.state = 1
	const socket = userStore.socket;

	const matchmakingVisible = ref(true);
	

	const connect = () => {
		socket.emit("game_connect");
	}
	
	const	listeners: { [key: string]: (data?: any) => void } = {
		game_connected: () => {matchmakingVisible.value = false},
		updateUser: (data: UserConnected) => { userStore.updateMe(data) },
	}

	onMounted(() => {
		for (let name in listeners) {
			socket.on(name, listeners[name]);
		}
	})

	onUnmounted(() => {
		for (let name in listeners) {
			socket.off(name, listeners[name]);
		}
	})
</script>

<template>
	<div class="mainContent-play">
		<Game :close="() => matchmakingVisible = true" />

		<MatchMaking v-if="matchmakingVisible" :toggle="() => connect()" />
	</div>
</template>
