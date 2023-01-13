<script setup lang="ts">

	import { onMounted, onUnmounted, reactive } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '@/stores/UserStore'
	import { useSideBarStore } from '@/stores/SideBarStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'
	import router from '@/router'
	import { onBeforeRouteUpdate } from 'vue-router'
	import	getUserProfile from '../../requests/Profile/getUserProfile'
	import type { ProfileData } from '@/types/ProfileData'
	import type { userKeys } from '@/types/User'

	const	sbStore = useSideBarStore()
	const	contentStore = useContentStore()
	contentStore.state = 4

	const	data: ProfileData = reactive({
		user: {
			id: '',
			username: '',
			avatar: '',
			status: '',
			level: 0,
			experience: 0,
			next_level: 0,
			rank_point: 0,
			wins: 0,
			loses: 0,
			played: 0,
		},
		type: 1,
		loadingData: false,
		err: null
	})

	//	404 for unknown id
	getUserProfile(router.currentRoute.value.params.id as string, data)

	const	getStat = (index: number) => {
		if (index == 2) {
			let	ratio: number = data.user.loses == 0 ? data.user.wins : data.user.wins / data.user.loses
			ratio = isNaN(ratio) ? 0 : ratio
			return Number.isInteger(ratio) ? ratio : parseFloat(ratio.toFixed(2))
		}
		const	stats: userKeys[] = [
			'rank_point',
			'played',
			'wins',
			'loses',
		]
		console.log('stat', stats[index], data.user[stats[index]])
		return data.user[stats[index]] as number
	}

	onBeforeRouteUpdate((to, from) => {
		getUserProfile(to.params.id as string, data)
	})

	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	listeners: any[] = []

	onMounted(() => {
		listeners.push(socket.on('friend_request', (sender: any) => {
			if (sender.id === data.user.id)
				data.type = 5
		}))
		listeners.push(socket.on('friend_request_submitted', (receiver: any) => {
			if (receiver.id === data.user.id)
				data.type = 4
		}))
		listeners.push(socket.on('friend_accepted', (receiver: any) => {
			if (receiver.id === data.user.id)
				data.type = 2
		}))
		listeners.push(socket.on('friend_accepted_submitted', (sender: any) => {
			if (sender.id === data.user.id)
				data.type = 2
		}))
		listeners.push(socket.on('friend_declined', (receiver: any) => {
			if (receiver.id === data.user.id)
				data.type = 3
		}))
		listeners.push(socket.on('friend_declined_submitted', (sender: any) => {
			if (sender.id === data.user.id)
				data.type = 3
		}))
		listeners.push(socket.on('friend_removed', (sender: any) => {
			if (sender.id === data.user.id)
				data.type = 3
		}))
		listeners.push(socket.on('friend_removed_submitted', (receiver: any) => {
			if (receiver.id === data.user.id)
				data.type = 3
		}))
	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener))
	})

</script>

<template>

	<div class="mainContent-profile" v-if="!data.err && !data.loadingData">
		<ProfileTag
			:type="data.type"
			:user="data.user"
			@message="sbStore.openConv('Friend', data.user.id)"
			@delete="socket.emit('remove_friend', { friendId: data.user.id })"
			@add="socket.emit('add_friend', { friendId: data.user.id })"
			@accept="socket.emit('accept_friend', { friendId: data.user.id })"
			@refuse="socket.emit('decline_friend', { friendId: data.user.id })"
		/>
		<div class="Profile-section">
			<h2 class="Section-name">Statistics</h2>
			<div class="StatisticsWrap">
				<ProfileStat
					v-for="n in 5"
					:key="n"
					:index="n - 1"
					:value="getStat(n - 1)"
				/>
			</div>
		</div>
		<div class="Profile-section">
			<h2 class="Section-name">Match History</h2>
			<MatchHistory />
		</div>
	</div>

</template>
