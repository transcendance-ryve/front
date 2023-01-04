<script setup lang="ts">

	import { reactive, ref, watch, computed, type Ref } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import SideBarSwitch from './SideBarSwitch.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import SideBarTag from './SideBarTag.vue'
	import { profileRedirect } from '@/router'
	import type { axiosState } from '@/requests/useAxios'
	import getFriends from '@/requests/SideBar/getFriends'
	import getUsers from '@/requests/SideBar/getUsers'

	export interface	contentData {
		id: number,			//	user			id
		avatar: string,		//	user / chan		avatar
		username: string,	//	user 			name
		name: string,		//	chan 			name
		status: string,		//	user / chan		status
		time: number,		//	user / chan		timer
		lastMsg: string,	//	user / chan		last message
		users: number,		//	chan			users count
	}

	const	data1: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Karim',
			lastMsg: 'riwoj dsoj aifs ewiha efv d yaveogahf sjdhfb',
			time: 1,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Kylian',
			lastMsg: 'Dispo pour une game dans 5min ?',
			time: 2,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Antoine',
			lastMsg: 'Salut',
			time: 3,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Ousmane',
			lastMsg: '',
			time: 4,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Kingsley',
			lastMsg: 'Salut',
			time: 5,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Raphael',
			lastMsg: 'Salut ca va',
			time: 6,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Benjamin',
			lastMsg: 'Dispo pour une game dans 5min ?',
			time: 7,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Theo',
			lastMsg: '',
			time: 8,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Lucas',
			lastMsg: '',
			time: 9,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Adrien',
			lastMsg: 'Wsh le couz',
			time: 10,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Alphonse',
			lastMsg: 'Dispo pour une game dans 5mi...',
			time: 11,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Steve',
			lastMsg: 'Salut',
			time: 12,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			username: 'Olivier',
			lastMsg: '',
			time: 13,
			status: 'OFFLINE'
		},
	])

	const	data2: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Karim',
			time: 5,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Kylian',
			time: 23,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Antoine',
			time: 4,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Ousmane',
			time: 8,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Kingsley',
			time: 2,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Raphael',
			time: 17,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Benjamin',
			time: 6,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Theo',
			time: 1,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Lucas',
			time: 63,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Adrien',
			time: 55,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Alphonse',
			time: 13,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Steve',
			time: 16,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Olivier',
			time: 51,
			status: 'IN GAME'
		},
	])

	const	data3: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'RYVE',
			lastMsg: 'Hedi: hdo pa fiaue ub pad fsiubfebusd wiuh',
			time: 2,
			status: 'PRIVATE',
			users: 4
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN1',
			lastMsg: 'User: Salut',
			time: 1,
			status: 'PROTECTED',
			users: 31
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN2',
			lastMsg: 'User: Salut',
			time: 3,
			status: 'PUBLIC',
			users: 64
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN3',
			lastMsg: 'User: Salut',
			time: 4,
			status: 'PUBLIC',
			users: 6
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN4',
			lastMsg: 'User: Salut',
			time: 5,
			status: 'PRIVATE',
			users: 11
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN5',
			lastMsg: 'User: Salut',
			time: 6,
			status: 'PROTECTED',
			users: 5
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN6',
			lastMsg: 'User: Salut',
			time: 7,
			status: 'PUBLIC',
			users: 2
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN7',
			lastMsg: 'User: Salut',
			time: 8,
			status: 'PUBLIC',
			users: 106
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN8',
			lastMsg: 'User: Salut',
			time: 9,
			status: 'PROTECTED',
			users: 20
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN9',
			lastMsg: 'User: Salut',
			time: 10,
			status: 'PRIVATE',
			users: 34
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN10',
			lastMsg: 'User: Salut',
			time: 11,
			status: 'PUBLIC',
			users: 7
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN11',
			lastMsg: 'User: Salut',
			time: 12,
			status: 'PROTECTED',
			users: 3
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN12',
			lastMsg: 'User: Salut',
			time: 13,
			status: 'PUBLIC',
			users: 12
		},
	])

	const	data4: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'RYVE',
			time: 1,
			status: 'PUBLIC',
			users: 4
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN1',
			time: 2,
			status: 'PROTECTED',
			users: 42
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN2',
			time: 3,
			status: 'PUBLIC',
			users: 14
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN3',
			time: 4,
			status: 'PUBLIC',
			users: 106
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN4',
			time: 5,
			status: 'PUBLIC',
			users: 8
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN5',
			time: 6,
			status: 'PROTECTED',
			users: 4000
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN6',
			time: 7,
			status: 'PUBLIC',
			users: 2
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN7',
			time: 8,
			status: 'PROTECTED',
			users: 7
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN8',
			time: 9,
			status: 'PUBLIC',
			users: 4
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN9',
			time: 10,
			status: 'PROTECTED',
			users: 21
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN10',
			time: 11,
			status: 'PUBLIC',
			users: 10
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN11',
			time: 12,
			status: 'PUBLIC',
			users: 18
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN12',
			time: 13,
			status: 'PUBLIC',
			users: 1
		},
	])

	const	data5: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Karim',
			time: 5,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Kylian',
			time: 23,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Antoine',
			time: 4,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Ousmane',
			time: 8,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Kingsley',
			time: 2,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Raphael',
			time: 17,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Benjamin',
			time: 6,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Theo',
			time: 1,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Lucas',
			time: 63,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Adrien',
			time: 55,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Alphonse',
			time: 13,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Steve',
			time: 16,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Olivier',
			time: 51,
			status: 'ONLINE'
		},
	])

	const	data6: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Benjamin',
			time: 6,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Lucas',
			time: 63,
			status: 'ONLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Adrien',
			time: 55,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Alphonse',
			time: 13,
			status: 'IN GAME'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Steve',
			time: 16,
			status: 'OFFLINE'
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'Olivier',
			time: 51,
			status: 'ONLINE'
		},
	])

	const	data7: Partial<contentData>[] = reactive([
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'RYVE',
			time: 1,
			status: 'PRIVATE',
			users: 4
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN1',
			time: 2,
			status: 'PROTECTED',
			users: 42
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN2',
			time: 3,
			status: 'PUBLIC',
			users: 14
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN3',
			time: 4,
			status: 'PRIVATE',
			users: 106
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN4',
			time: 5,
			status: 'PUBLIC',
			users: 8
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN5',
			time: 6,
			status: 'PROTECTED',
			users: 4000
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN6',
			time: 7,
			status: 'PUBLIC',
			users: 2
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN7',
			time: 8,
			status: 'PROTECTED',
			users: 7
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN8',
			time: 9,
			status: 'PRIVATE',
			users: 4
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN9',
			time: 10,
			status: 'PROTECTED',
			users: 21
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN10',
			time: 11,
			status: 'PUBLIC',
			users: 10
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN11',
			time: 12,
			status: 'PUBLIC',
			users: 18
		},
		{
			avatar: 'http://localhost:3000/default.png',
			name: 'CHAN12',
			time: 13,
			status: 'PUBLIC',
			users: 1
		},
	])

	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})
	const	sbStore = useSideBarStore()

	const	contentData: Ref<Partial<contentData>[]> = ref([])

	const	getRawData = async () => {
		let	fetchData: Partial<contentData>[] = []

		if (sbStore.state.section == 1) {
			if (sbStore.state.friendsState == 1)
				fetchData = await getFriends(dataState)
			else if (toFind.value)
				fetchData = await getUsers(toFind.value, dataState)
		}
		else if (sbStore.state.section == 2) {
			if (sbStore.state.channelsState == 1)
				fetchData = data3
			else
				fetchData = data4
		}
		else {
			if (sbStore.state.notifsState == 1)
				fetchData = data5
			else if (sbStore.state.notifsState == 2)
				fetchData = data6
			else
				fetchData = data7
		}
		contentData.value = fetchData
	}

	// const	sortData = () => {
		// contentData.sort((a, b) => {
		// 	return a.time! - b.time!
		// })
	// }

	watch(sbStore.state, async () => {
		await getRawData()
		// sortData()
	})

	const	toFind: Ref<string> = ref('')

	const	filterDataBySearch = () => {
		return contentData.value.filter(item => {
			return item.name?.toLowerCase().includes(toFind.value.toLowerCase())
			|| item.username?.toLowerCase().includes(toFind.value.toLowerCase())
		})
	}

	watch(toFind, async () => {
		if (toFind.value && (sbStore.state.section === 1 && sbStore.state.friendsState === 2))
			contentData.value = await getUsers(toFind.value, dataState)
	})

	const	data = computed(() => {
		if (dataState.error || dataState.loading)
			return
		if (toFind.value) {
			if (sbStore.state.section === 1 && sbStore.state.friendsState === 2)
				return contentData.value
			else
				return filterDataBySearch()
		}
		else if (!((sbStore.state.section === 1 && sbStore.state.friendsState === 2) ||
				(sbStore.state.section === 2 && sbStore.state.channelsState === 2)))
			return contentData.value
	})

	const	openConv = (name: string = '', status: string = '') => {
		if (sbStore.state.section == 1 && sbStore.state.friendsState == 1) {
			sbStore.openConv('Friend', name, status)
		}
		else if (sbStore.state.section == 2 && sbStore.state.channelsState == 1) {
			sbStore.openConv('Channel', name, status)
		}
	}

	getRawData()

</script>

<template>

	<div class="SideBar-content-wrap">
		<SideBarSwitch/>

		<SearchInput @search="(val) => toFind = val"/>

		<button
			v-if="sbStore.state.section == 2 && sbStore.state.channelsState == 1"
			class="Content-newChanBtn"
			@click="sbStore.newChan = true"
		>
			<span class="NewChanBtn-value">Create new channel</span>
		</button>

		<div class="SideBar-content" v-if="sbStore.state.section == 1">
			<SideBarTag
				v-for="(item, index) in data"
				:key="index"
				:type="sbStore.state.friendsState"
				:data="item"
				@click.self="profileRedirect(item.id || 0)"
			/>
		</div>

		<div class="SideBar-content" v-if="sbStore.state.section == 2">
			<SideBarTag
				v-for="(item, index) in data"
				:key="index"
				:type="sbStore.state.channelsState"
				:data="item"
				@click="openConv(item.name, item.status)"
			/>
		</div>

		<div class="SideBar-content" v-if="sbStore.state.section == 3">
			<SideBarTag
				v-for="(item, index) in data"
				:key="index"
				:type="sbStore.state.notifsState"
				:data="item"
			/>
		</div>
	</div>

</template>
