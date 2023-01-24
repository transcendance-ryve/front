<script setup lang="ts">

	import { ref, type Ref, onMounted, onUnmounted, reactive } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '@/stores/UserStore'
	import { useSidebarStore } from '@/stores/SidebarStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'
	import router from '@/router'
	import { onBeforeRouteUpdate } from 'vue-router'
	import	getUserProfile from '../../requests/Profile/getUserProfile'
	import getBlockRelation from '@/requests/Sidebar/Friends/getBlockRelation'
	import type { ProfileData } from '@/types/ProfileData'
	import type { User, userKeys } from '@/types/User'
	import type { SocketEvent } from '@/types/Socket'
	import NotFound from '@/views/NotFound.vue'

	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	sbStore = useSidebarStore()
	const	contentStore = useContentStore()
	const	blockRelation: Ref<number> = ref(-1)
	contentStore.state = 4

	const	data: ProfileData = reactive({
		user: {} as User,
		type: 1,
		loadingData: false,
		err: null
	})

	const	getStat = (index: number) => {
		if (index == 2) {
			let	ratio: number = data.user.loses === 0 ? data.user.wins : data.user.wins / data.user.loses
			ratio = isNaN(ratio) ? 0 : ratio
			return Number.isInteger(ratio) ? ratio : parseFloat(ratio.toFixed(2))
		}
		else if (index > 2)
			index--
		const	stats: userKeys[] = [
			'rank_point',
			'played',
			'wins',
			'loses',
		]
		return data.user[stats[index]] as number
	}

	onBeforeRouteUpdate((to, from) => {
		if (to.params.id !== from.params.id)
			getUserProfile(to.params.id as string, data)
	})

	const	listeners: SocketEvent[] = [
		{
			name: 'friend_request',
			callback: (sender: any) => {
				if (sender.id === data.user.id) data.type = 5
			}
		},
		{
			name: 'friend_request_submitted',
			callback: (receiver: any) => {
				if (receiver.id === data.user.id) data.type = 4
			}
		},
		{
			name: 'friend_accepted',
			callback: (receiver: any) => {
				if (receiver.id === data.user.id) data.type = 2
			}
		},
		{
			name: 'friend_accepted_submitted',
			callback: (sender: any) => {
				if (sender.id === data.user.id) data.type = 2
			}
		},
		{
			name: 'friend_declined',
			callback: (receiver: any) => {
				if (receiver.id === data.user.id) data.type = 3
			}
		},
		{
			name: 'friend_declined_submitted',
			callback: (sender: any) => {
				if (sender.id === data.user.id) data.type = 3
			}
		},
		{
			name: 'friend_removed',
			callback: (sender: any) => {
				if (sender.id === data.user.id) data.type = 3
			}
		},
		{
			name: 'friend_removed_submitted',
			callback: (receiver: any) => {
				if (receiver.id === data.user.id) data.type = 3
			}
		},
		{
			name: 'user_blocked',
			callback: (sender: any) => {
				if (sender.id === data.user.id && blockRelation.value !== 1) blockRelation.value = 2
			}
		},
		{
			name: 'user_blocked_submitted',
			callback: (receiver: any) => {
				if (receiver.id === data.user.id) blockRelation.value = 1
			}
		},
		{
			name: 'user_unblocked',
			callback: (sender: any) => {
				if (sender.id === data.user.id) {
					blockRelation.value = -1
					whoIsBlocked()
				}
			}
		},
		{
			name: 'user_unblocked_submitted',
			callback: (receiver: any) => {
				if (receiver.id === data.user.id) {
					blockRelation.value = -1
					whoIsBlocked()
				}
			}
		},
	]

	const	whoIsBlocked = async () => {
		const	res = await getBlockRelation(router.currentRoute.value.params.id as string)
		if (res === 'targetBlocked')
			blockRelation.value = 1
		else if (res === 'userBlocked')
			blockRelation.value = 2
		else
			blockRelation.value = 0
	}

	onMounted(async () => {
		await getUserProfile(router.currentRoute.value.params.id as string, data)
		if (data.type === 1)
			blockRelation.value = 0
		else
			await whoIsBlocked()
		listeners.forEach(listener => socket.on(listener.name, listener.callback))
	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

</script>

<template>

	<div class="mainContent-profile" v-if="!data.err && !data.loadingData">
		<ProfileTag
			:type="data.type"
			:user="data.user"
			:blockRelation="blockRelation"
			@message="sbStore.openConv('Friend', data.user.id, false)"
			@delete="socket.emit('remove_friend', { friendId: data.user.id })"
			@add="socket.emit('add_friend', { friendId: data.user.id })"
			@accept="socket.emit('accept_friend', { friendId: data.user.id })"
			@refuse="socket.emit('decline_friend', { friendId: data.user.id })"
			@block="socket.emit('block_user', { blockedId: data.user.id })"
			@unblock="socket.emit('unblock_user', { blockedId: data.user.id })"
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
			<MatchHistory :userId="(router.currentRoute.value.params.id as string)"/>
		</div>
	</div>
	<NotFound v-else-if="data.err?.response?.status === 404"/>

</template>
