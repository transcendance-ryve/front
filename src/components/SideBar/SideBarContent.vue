<script setup lang="ts">

	import { reactive, ref, watch, computed } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import SideBarSwitch from './SideBarSwitch.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import SideBarTag from './SideBarTag.vue'

	const	data1 = reactive([
		{
			name: 'Karim',
			lastMsg: 'Wsh le couz',
			time: 1,
			status: 'In Game'
		},
		{
			name: 'Kylian',
			lastMsg: 'Dispo pour une game dans 5mi...',
			time: 2,
			status: 'Online'
		},
		{
			name: 'Antoine',
			lastMsg: 'Salut',
			time: 3,
			status: 'Offline'
		},
		{
			name: 'Ousmane',
			lastMsg: '',
			time: 4,
			status: 'Online'
		},
		{
			name: 'Kingsley',
			lastMsg: 'Salut',
			time: 5,
			status: 'Offline'
		},
		{
			name: 'Raphael',
			lastMsg: 'Salut ca va',
			time: 6,
			status: 'In Game'
		},
		{
			name: 'Benjamin',
			lastMsg: 'Dispo pour une game dans 5mi...',
			time: 7,
			status: 'Offline'
		},
		{
			name: 'Theo',
			lastMsg: '',
			time: 8,
			status: 'Online'
		},
		{
			name: 'Lucas',
			lastMsg: '',
			time: 9,
			status: 'Offline'
		},
		{
			name: 'Adrien',
			lastMsg: 'Wsh le couz',
			time: 10,
			status: 'Offline'
		},
		{
			name: 'Alphonse',
			lastMsg: 'Dispo pour une game dans 5mi...',
			time: 11,
			status: 'Online'
		},
		{
			name: 'Steve',
			lastMsg: 'Salut',
			time: 12,
			status: 'In Game'
		},
		{
			name: 'Olivier',
			lastMsg: '',
			time: 13,
			status: 'Offline'
		},
	])

	const	data2 = reactive([
		{
			name: 'Karim',
			time: 5,
			status: 'In Game'
		},
		{
			name: 'Kylian',
			time: 23,
			status: 'Online'
		},
		{
			name: 'Antoine',
			time: 4,
			status: 'Offline'
		},
		{
			name: 'Ousmane',
			time: 8,
			status: 'In Game'
		},
		{
			name: 'Kingsley',
			time: 2,
			status: 'Online'
		},
		{
			name: 'Raphael',
			time: 17,
			status: 'Offline'
		},
		{
			name: 'Benjamin',
			time: 6,
			status: 'In Game'
		},
		{
			name: 'Theo',
			time: 1,
			status: 'Offline'
		},
		{
			name: 'Lucas',
			time: 63,
			status: 'Online'
		},
		{
			name: 'Adrien',
			time: 55,
			status: 'Offline'
		},
		{
			name: 'Alphonse',
			time: 13,
			status: 'Offline'
		},
		{
			name: 'Steve',
			time: 16,
			status: 'Offline'
		},
		{
			name: 'Olivier',
			time: 51,
			status: 'In Game'
		},
	])

	const	data3 = reactive([
		{
			name: 'RYVE',
			lastMsg: 'Hedi: J\'ai fini Irc les freres',
			time: 1,
			status: 'Private',
			users: 4
		},
		{
			name: 'CHAN1',
			lastMsg: 'User: Salut',
			time: 2,
			status: 'Protected',
			users: 31
		},
		{
			name: 'CHAN2',
			lastMsg: 'User: Salut',
			time: 3,
			status: 'Public',
			users: 64
		},
		{
			name: 'CHAN3',
			lastMsg: 'User: Salut',
			time: 4,
			status: 'Public',
			users: 6
		},
		{
			name: 'CHAN4',
			lastMsg: 'User: Salut',
			time: 5,
			status: 'Private',
			users: 11
		},
		{
			name: 'CHAN5',
			lastMsg: 'User: Salut',
			time: 6,
			status: 'Protected',
			users: 5
		},
		{
			name: 'CHAN6',
			lastMsg: 'User: Salut',
			time: 7,
			status: 'Public',
			users: 2
		},
		{
			name: 'CHAN7',
			lastMsg: 'User: Salut',
			time: 8,
			status: 'Public',
			users: 106
		},
		{
			name: 'CHAN8',
			lastMsg: 'User: Salut',
			time: 9,
			status: 'Protected',
			users: 20
		},
		{
			name: 'CHAN9',
			lastMsg: 'User: Salut',
			time: 10,
			status: 'Private',
			users: 34
		},
		{
			name: 'CHAN10',
			lastMsg: 'User: Salut',
			time: 11,
			status: 'Public',
			users: 7
		},
		{
			name: 'CHAN11',
			lastMsg: 'User: Salut',
			time: 12,
			status: 'Protected',
			users: 3
		},
		{
			name: 'CHAN12',
			lastMsg: 'User: Salut',
			time: 13,
			status: 'Public',
			users: 12
		},
	])

	const	data4 = reactive([
		{
			name: 'RYVE',
			time: 1,
			status: 'Public',
			users: 4
		},
		{
			name: 'CHAN1',
			time: 2,
			status: 'Protected',
			users: 42
		},
		{
			name: 'CHAN2',
			time: 3,
			status: 'Public',
			users: 14
		},
		{
			name: 'CHAN3',
			time: 4,
			status: 'Public',
			users: 106
		},
		{
			name: 'CHAN4',
			time: 5,
			status: 'Public',
			users: 8
		},
		{
			name: 'CHAN5',
			time: 6,
			status: 'Protected',
			users: 4000
		},
		{
			name: 'CHAN6',
			time: 7,
			status: 'Public',
			users: 2
		},
		{
			name: 'CHAN7',
			time: 8,
			status: 'Protected',
			users: 7
		},
		{
			name: 'CHAN8',
			time: 9,
			status: 'Public',
			users: 4
		},
		{
			name: 'CHAN9',
			time: 10,
			status: 'Protected',
			users: 21
		},
		{
			name: 'CHAN10',
			time: 11,
			status: 'Public',
			users: 10
		},
		{
			name: 'CHAN11',
			time: 12,
			status: 'Public',
			users: 18
		},
		{
			name: 'CHAN12',
			time: 13,
			status: 'Public',
			users: 1
		},
	])

	const	data5 = reactive([
		{
			name: 'Karim',
			time: 5,
			status: 'In Game'
		},
		{
			name: 'Kylian',
			time: 23,
			status: 'Online'
		},
		{
			name: 'Antoine',
			time: 4,
			status: 'Offline'
		},
		{
			name: 'Ousmane',
			time: 8,
			status: 'Online'
		},
		{
			name: 'Kingsley',
			time: 2,
			status: 'Online'
		},
		{
			name: 'Raphael',
			time: 17,
			status: 'Offline'
		},
		{
			name: 'Benjamin',
			time: 6,
			status: 'Online'
		},
		{
			name: 'Theo',
			time: 1,
			status: 'In Game'
		},
		{
			name: 'Lucas',
			time: 63,
			status: 'Online'
		},
		{
			name: 'Adrien',
			time: 55,
			status: 'Offline'
		},
		{
			name: 'Alphonse',
			time: 13,
			status: 'Offline'
		},
		{
			name: 'Steve',
			time: 16,
			status: 'Offline'
		},
		{
			name: 'Olivier',
			time: 51,
			status: 'Online'
		},
	])

	const	data6 = reactive([
		{
			name: 'Benjamin',
			time: 6,
			status: 'Online'
		},
		{
			name: 'Lucas',
			time: 63,
			status: 'Online'
		},
		{
			name: 'Adrien',
			time: 55,
			status: 'Offline'
		},
		{
			name: 'Alphonse',
			time: 13,
			status: 'In Game'
		},
		{
			name: 'Steve',
			time: 16,
			status: 'Offline'
		},
		{
			name: 'Olivier',
			time: 51,
			status: 'Online'
		},
	])

	const	data7 = reactive([
		{
			name: 'RYVE',
			time: 1,
			status: 'Private',
			users: 4
		},
		{
			name: 'CHAN1',
			time: 2,
			status: 'Protected',
			users: 42
		},
		{
			name: 'CHAN2',
			time: 3,
			status: 'Public',
			users: 14
		},
		{
			name: 'CHAN3',
			time: 4,
			status: 'Private',
			users: 106
		},
		{
			name: 'CHAN4',
			time: 5,
			status: 'Public',
			users: 8
		},
		{
			name: 'CHAN5',
			time: 6,
			status: 'Protected',
			users: 4000
		},
		{
			name: 'CHAN6',
			time: 7,
			status: 'Public',
			users: 2
		},
		{
			name: 'CHAN7',
			time: 8,
			status: 'Protected',
			users: 7
		},
		{
			name: 'CHAN8',
			time: 9,
			status: 'Private',
			users: 4
		},
		{
			name: 'CHAN9',
			time: 10,
			status: 'Protected',
			users: 21
		},
		{
			name: 'CHAN10',
			time: 11,
			status: 'Public',
			users: 10
		},
		{
			name: 'CHAN11',
			time: 12,
			status: 'Public',
			users: 18
		},
		{
			name: 'CHAN12',
			time: 13,
			status: 'Public',
			users: 1
		},
	])

	const	sbStore = useSideBarStore()

	const	dataSorted = computed(() => {
		if (sbStore.section == 1) {
			if (sbStore.friendsState == 1) {
				return data1.sort((a, b) => {
					return a.time - b.time
				})
			}
			else {
				return data2.sort((a, b) => {
					return a.time - b.time
				})
			}
		}
		else if (sbStore.section == 2) {
			if (sbStore.channelsState == 1) {
				return data3.sort((a, b) => {
					return a.time - b.time
				})
			}
			else {
				return data4.sort((a, b) => {
					return a.time - b.time
				})
			}
		}
		else {
			if (sbStore.notifsState == 1) {
				return data5.sort((a, b) => {
					return a.time - b.time
				})
			}
			else if (sbStore.notifsState == 2) {
				return data6.sort((a, b) => {
					return a.time - b.time
				})
			}
			else {
				return data7.sort((a, b) => {
					return a.time - b.time
				})
			}
		}
	})

	const	inputRes = computed(() => {
		return dataSorted.value.filter(user => user.name.toLowerCase().includes(sbStore.toFind.toLowerCase()))
	})

	const	users = computed(() => {
		if (sbStore.toFind)
			return inputRes.value
		else if (!((sbStore.section == 1 && sbStore.friendsState == 2) ||
				(sbStore.section == 2 && sbStore.channelsState == 2)))
			return dataSorted.value
	})

	const	openConv = (name: string, status: string) => {
		if (sbStore.section == 1 && sbStore.friendsState == 1) {
			sbStore.openConv('Friend', name, status)
		}
		else if (sbStore.section == 2 && sbStore.channelsState == 1) {
			sbStore.openConv('Channel', name, status)
		}
	}

</script>

<template>

	<div class="SideBar-content-wrap">
		<SideBarSwitch/>

		<SearchInput @search="(val) => sbStore.toFind = val"/>

		<button
			v-if="sbStore.section == 2 && sbStore.channelsState == 1"
			class="Content-newChanBtn"
			@click="sbStore.newChan = true"
		>
			Create new channel
		</button>

		<div class="SideBar-content" v-if="sbStore.section == 1">
			<SideBarTag
				v-for="(user, index) in users"
				:key="index"
				:type="sbStore.section"
				:option="sbStore.friendsState"
				:name="user.name"
				:lastMsg="user.lastMsg"
				:status="user.status"
				@click="openConv(user.name, user.status)"
			/>
		</div>

		<div class="SideBar-content" v-if="sbStore.section == 2">
			<SideBarTag
				v-for="(user, index) in users"
				:key="index"
				:type="sbStore.section"
				:option="sbStore.channelsState"
				:name="user.name"
				:lastMsg="user.lastMsg"
				:status="user.status"
				:users="user.users"
				@click="openConv(user.name, user.status)"
			/>
		</div>

		<div class="SideBar-content" v-if="sbStore.section == 3">
			<SideBarTag
				v-for="(user, index) in users"
				:key="index"
				:type="sbStore.section"
				:option="sbStore.notifsState"
				:name="user.name"
				:status="user.status"
				:users="user.users"
			/>
		</div>
	</div>

</template>
