<script setup lang="ts">	
	import { useContentStore } from '../../stores/ContentStore'
	import Game from '@/components/Play/Game.vue'
	import Matchmaking from '@/components/Play/Matchmaking.vue'
	import Win from '@/components/Play/Win.vue'
	import { ref, reactive, onMounted, onUnmounted } from 'vue'
	import { useUserStore } from '@/stores/UserStore'
	import type { UserConnected } from '@/types/User'

	const userStore = useUserStore();
	const	contentStore = useContentStore()
	contentStore.state = 1
	const socket = userStore.socket;

	const matchmakingVisible = ref(false);	
	
	const	listeners: { [key: string]: (data?: any) => void } = {
		game_connected: () => {matchmakingVisible.value = false},
		start: () => {matchmakingVisible.value = false},
		matchmacking: () => {matchmakingVisible.value = true},
		reconnected_to_game: (hasGame: boolean) => {matchmakingVisible.value = !hasGame},
		updateUser: (data: UserConnected) => { userStore.updateMe(data) }
	}

	onMounted(() => {
		for (let name in listeners) {
			socket.on(name, listeners[name]);
		}

		socket.emit('connect_game');
		socket.emit('join_play');
	})

	onUnmounted(() => {
		for (let name in listeners) {
			socket.off(name, listeners[name]);
		}

		socket.emit('leave_play');
	})
</script>

<template>
	<div class="mainContent-play">
		<Game :close="() => matchmakingVisible = true" />	

		<Matchmaking v-if="matchmakingVisible" :close="() => matchmakingVisible = false" />
	</div>
</template>
