<script setup lang="ts">

	import { reactive, ref, watch, computed, type Ref, onMounted, onUnmounted } from 'vue'
	import { useSidebarStore } from '../../stores/SidebarStore'
	import { useUserStore } from '@/stores/UserStore'
	import SidebarSwitch from './SidebarSwitch.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import SidebarTag from './SidebarTag.vue'
	import router, { profileRedirect } from '@/router'
	import type { axiosState } from '@/requests/useAxios'
	import type { ContentData } from '@/types/Sidebar'
	import getFriends from '@/requests/Sidebar/Friends/getFriends'
	import getAddFriendsList from '@/requests/Sidebar/Friends/getAddFriendsList'
	import getFriendsRequests from '@/requests/Sidebar/Friends/getFriendsRequests'
	import getMyChannels from '@/requests/Sidebar/Channels/getMyChannels'
	import getChannels from '@/requests/Sidebar/Channels/getChannels'
	import getChannelsNotifs from '@/requests/Sidebar/Channels/getChannelsNotifs'
	import getGameRequests from '@/requests/Sidebar/Games/getGameRequests'
	import getBlockRelation from '@/requests/Sidebar/Friends/getBlockRelation'
	import LoaderSpinner from '../Utils/LoaderSpinner.vue'
	import type { SocketEvent } from '@/types/Socket'

	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})
	const	sbStore = useSidebarStore()
	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	contentData: Ref<Partial<ContentData>[]> = ref([])

	const	getRawData = async () => {
		let	fetchData: Partial<ContentData>[] = []
		contentData.value = []

		if (sbStore.state.section === 1) {
			if (sbStore.state.friendsState === 1)
				fetchData = await getFriends(dataState)
			else if (toFind.value)
				fetchData = await getAddFriendsList(toFind.value, dataState) as Partial<ContentData>[]
		}
		else if (sbStore.state.section === 2) {
			if (sbStore.state.channelsState === 1) {
				fetchData = await getMyChannels(dataState)
			}
			else if (toFind.value)
				fetchData = await getChannels(toFind.value, dataState)
		}
		else {
			if (sbStore.state.notifsState === 1)
				fetchData = await getGameRequests(dataState)
			else if (sbStore.state.notifsState === 2)
				fetchData = await getFriendsRequests(dataState)
			else
				fetchData = await getChannelsNotifs(dataState)
		}
		contentData.value = fetchData
	}

	watch(sbStore.state, async () => {
		await getRawData()
		if (sbStore.state.section === 3) {
			if (sbStore.state.notifsState === 1)
				sbStore.notifications.game = 0
			else if (sbStore.state.notifsState === 2)
				sbStore.notifications.friend = 0
			else
				sbStore.notifications.channel = 0
		}
	})

	const	toFind: Ref<string> = ref('')

	const	filterDataBySearch = () => {
		return contentData.value.filter(item => {
			return item.name?.toLowerCase().includes(toFind.value.toLowerCase())
			|| item.username?.toLowerCase().includes(toFind.value.toLowerCase())
		})
	}

	watch(toFind, async () => {
		if (toFind.value) {
			if (sbStore.state.section === 1 && sbStore.state.friendsState === 2)
				contentData.value = await getAddFriendsList(toFind.value, dataState) as Partial<ContentData>[]
			else if (sbStore.state.section === 2 && sbStore.state.channelsState === 2)
				contentData.value = await getChannels(toFind.value, dataState)
		}
	})

	const	data = computed(() => {
		if (dataState.error || dataState.loading)
			return
		if (toFind.value) {
			if ((sbStore.state.section === 1 && sbStore.state.friendsState === 2) || sbStore.state.section === 2 && sbStore.state.channelsState === 2)
				return contentData.value
			else
				return filterDataBySearch()
		}
		else if (!((sbStore.state.section === 1 && sbStore.state.friendsState === 2) ||
				(sbStore.state.section === 2 && sbStore.state.channelsState === 2)))
			return contentData.value
	})

	const	openConv = (id: string = '') => {
		if (sbStore.state.section == 1 && sbStore.state.friendsState == 1) {
			sbStore.openConv('Friend', id)
		}
		else if (sbStore.state.section == 2 && sbStore.state.channelsState == 1) {
			sbStore.openConv('Channel', id)
		}
	}

	const	unshiftTag = (tag: Partial<ContentData>) => {
		if (contentData.value.find((item: Partial<ContentData>) => item.id === tag.id) === undefined)
			contentData.value.unshift(tag)
	}

	const	removeTag = (tag: Partial<ContentData>) => {
		contentData.value = contentData.value.filter(item => item.id !== tag.id)
	}

	const	listeners: SocketEvent[] = [
		{
			name: 'friend_request',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 2)
					unshiftTag(sender)
				else if (sbStore.state.section === 1 && sbStore.state.notifsState === 2)
					removeTag(sender)
			}
		},
		{
			name: 'friend_request_submitted',
			callback: (receiver: Partial<ContentData>) => {
				if (sbStore.state.section === 1 && sbStore.state.friendsState === 2)
					removeTag(receiver)
			}
		},
		{
			name: 'friend_accepted',
			callback: (receiver: Partial<ContentData>) => {
				if (sbStore.state.section === 1 && sbStore.state.friendsState === 1)
					unshiftTag(receiver)
			}
		},
		{
			name: 'friend_accepted_submitted',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 2)
					removeTag(sender)
				else if (sbStore.state.section === 1 && sbStore.state.friendsState === 1)
					unshiftTag(sender)
			}
		},
		{
			name: 'friend_declined_submitted',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 2)
					removeTag(sender)
			}
		},
		{
			name: 'friend_removed',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 1 && sbStore.state.friendsState === 1)
					removeTag(sender)
			}
		},
		{
			name: 'friend_removed_submitted',
			callback: (receiver: Partial<ContentData>) => {
				if (sbStore.state.section === 1 && sbStore.state.friendsState === 1)
					removeTag(receiver)
			}
		},
		{
			name: 'chanInvitationReceived',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 3)
					unshiftTag(sender)
			}
		},
		{
			name: 'invitationAccepted',
			callback: (id: string) => { sbStore.openConv('Channel', id); sbStore.state.section = 0 }
		},
		{
			name: 'invitationDeclined',
			callback: (id: string) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 3)
					removeTag({ id })
			}
		},
		{
			name: 'joinRoomSuccess',
			callback: (id: string) => { sbStore.openConv('Channel', id); sbStore.state.section = 0 }
		},
		{
			name: 'banned',
			callback: (res: { id: string }) => {
				if (sbStore.state.section === 2 && sbStore.state.channelsState === 1) {
					contentData.value = contentData.value.filter(item => item.id !== res.id)
				}
			}
		},
		{
			name: 'roomUpdated',
			callback: (res: { id: string, name: string, status: string, avatar: string }) => {
				if (sbStore.state.section === 2 && sbStore.state.channelsState === 1) {
					const index = contentData.value.findIndex(item => item.id === res.id)
					if (index !== -1) {
						contentData.value[index].name = res.name
						contentData.value[index].status = res.status
						contentData.value[index].avatar = res.avatar
					}
				}
			}
		},
		{
			name: 'private_game_request',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 1)
					unshiftTag(sender);
			}
		},
		{
			name: 'game_request_decline',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 1)
					removeTag(sender);
			}
		},
		{
			name: 'game_request_accept',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 1) {
					removeTag(sender);
					router.push({ path: '/play' });
				}
			}
		},
		{
			name: 'game_request_timeup',
			callback: (sender: Partial<ContentData>) => {
				if (sbStore.state.section === 3 && sbStore.state.notifsState === 1)
					removeTag(sender);
			}
		},
		{
			name: 'incomingMessage',
			callback: async (res: any, convId: string) => {
				if (await getBlockRelation(res.sender.id) === 'targetBlocked')
					return
				if (res.channelName && sbStore.state.section === 2 && sbStore.state.channelsState === 1) {
					const	chan = contentData.value.find(item => item.id === convId)
					if (chan) chan.messages[0] = { content: res.content }
				}
				else {
					const	friend = contentData.value.find(item => item.id === res.sender.id)
					if (friend) friend.messages = { content: res.content }
				}
			}
		}
	]

	onMounted(() => {
		getRawData()
		listeners.forEach(listener => socket.on(listener.name, listener.callback))

	})

	onUnmounted(() => {
		listeners.forEach(listener => socket.off(listener.name, listener.callback))
	})

	const	handleClick = (id: string) => {
		if (sbStore.state.section === 1 || (sbStore.state.section === 3 && sbStore.state.notifsState !== 3))
			profileRedirect(id)
		else if (sbStore.state.section === 2)
			openConv(id)
	}

</script>

<template>

	<div class="Sidebar-content-wrap">
		<SidebarSwitch/>

		<SearchInput @search="(val: string) => toFind = val"/>

		<button
			v-if="sbStore.state.section === 2 && sbStore.state.channelsState === 1"
			class="Content-newChanBtn"
			@click="sbStore.newChan = true"
		>
			<span class="NewChanBtn-value">Create new channel</span>
		</button>

		<div class="Sidebar-content" v-if="!dataState.error">
			<SidebarTag
				v-for="(item, index) in data"
				:key="index"
				:data="item"
				@click="handleClick(item.id || '')"
			/>
			<LoaderSpinner size="30em" v-if="dataState.loading"/>
			<span
				class="Content-noResult"
				v-if="toFind && !dataState.loading && !dataState.error && !data?.length"
			>
				No results
			</span>
		</div>
	</div>

</template>
