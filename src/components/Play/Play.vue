<script setup lang="ts">	
	import { useContentStore } from '../../stores/ContentStore'
	import Game from '@/components/Play/Game.vue'
	import MatchMaking from '@/components/Play/MatchMaking.vue'
	import { ref, onMounted, onUnmounted } from 'vue'
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
	
	const	listeners: any[] = []

	onMounted(() => {
		listeners.push(socket.on("game_connected", () => {
			matchmakingVisible.value = false;
		}))
		listeners.push(socket.on('gameWin', () => {
			matchmakingVisible.value = true
		}))
		listeners.push(socket.on('gameLoose', () => {
			matchmakingVisible.value = true
		}))
		listeners.push(socket.on("updateUser", (data: UserConnected) => { userStore.updateMe(data) }))
	})

	onUnmounted(() => {
		listeners.forEach((listener) => {
			socket.off(listener)
		})
	})

</script>

<template>
	<div class="mainContent-play">
		<Game />

		<MatchMaking v-if="matchmakingVisible" :toggle="() => connect()" />
	</div>
</template>
