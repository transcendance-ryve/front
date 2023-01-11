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
	import	getUserProfile, { type userProfileData } from '../../requests/Profile/getUserProfile'

	const	sbStore = useSideBarStore()
	const	contentStore = useContentStore()
	contentStore.state = 4

	const	data: userProfileData = reactive({
		user: null,
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
		const	stats = [
			'rank_point',
			'played',
			'ratio',
			'wins',
			'loses',
		]
		return data.user[stats[index]]
	}

	onBeforeRouteUpdate((to, from) => {
		getUserProfile(to.params.id as string, data)
	})

	const	userStore = useUserStore()
	const	socket = userStore.socket

	onMounted(() => {
		socket.on('friend_request', (sender: any) => {
			if (sender.id === data.user.id)
				data.type = 5
		})
		socket.on('friend_request_submitted', (receiver: any) => {
			if (receiver.id === data.user.id)
				data.type = 4
		})
		socket.on('friend_accepted', (sender: any) => {
			console.log('change type', data.user.id, sender.id)
			if (sender.id === data.user.id)
				data.type = 2
		})
		socket.on('friend_accepted_submitted', (receiver: any) => {
			console.log('change type', data.user.id, receiver.id)
			if (receiver.id === data.user.id)
				data.type = 2
		})
		socket.on('friend_declined', (sender: any) => {
			console.log('change type', data.user.id, sender.id)
			if (sender.id === data.user.id)
				data.type = 3
		})
		socket.on('friend_declined_submitted', (receiver: any) => {
			console.log('change type', data.user.id, receiver.id)
			if (receiver.id === data.user.id)
				data.type = 3
		})
	})

	onUnmounted(() => {
		socket.off('friend_request')
		socket.off('friend_request_submitted')
		socket.off('friend_accepted')
		socket.off('friend_accepted_submitted')
		socket.off('friend_declined')
		socket.off('friend_declined_submitted')
	})

</script>

<template>

	<div class="mainContent-profile" v-if="!data.err && !data.loadingData">
		<ProfileTag
			:type="data.type"
			:user="data.user"
			@message="sbStore.openConv('Friend', data.user.id)"
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
