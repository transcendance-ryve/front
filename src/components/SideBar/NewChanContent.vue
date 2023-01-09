<script setup lang="ts">

	import { ref, reactive, computed, watch, type Ref } from 'vue'
	import { logoFriends, logoAdd, logoSearch } from '../../assets/logoSVG'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import UserTag from './UserTag.vue'
	import getUsers from '@/requests/SideBar/getUsers'
	import type { axiosState } from '@/requests/useAxios'
	export interface user {
		id: string,
		username: string,
		avatar: string
	}

	const props = defineProps({
		protectedStatus: {
			type: Boolean,
			default: false,
		},
	})

	const	sectionSelected = ref('Invitees')
	const	toFind = ref('')
	let		inviteesList: Ref<user[]> = ref([])
	let		addList: Ref<user[]> = ref([])
	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})

	const	isInvited = (user: user) => {
		for (let i = 0; i < inviteesList.value.length; i++)
			if (inviteesList.value[i].id === user.id)
				return true
		return false
	}

	watch(toFind, async () => {
		if (toFind.value && sectionSelected.value === 'Add') {
			addList.value = await getUsers(toFind.value, dataState)
			addList.value = addList.value.filter(user => {
				return !isInvited(user)
			})
		}
	})

	const	filterInviteesList = () => {
		return inviteesList.value.filter(user => {
			return (user.username.toLowerCase().includes(toFind.value.toLowerCase()))
		})
	}

	const	list = computed(() => {
		if (sectionSelected.value === 'Add' && (dataState.error || dataState.loading))
			return
		if (toFind.value) {
			if (sectionSelected.value === 'Invitees')
				return filterInviteesList()
			else
				return addList.value
		}
		else if (sectionSelected.value === 'Invitees')
			return inviteesList.value
	})

	const	addUser = (user: user) => {
		inviteesList.value.unshift(user)
		addList.value.splice(addList.value.indexOf(user), 1)
	}

	const	deleteUser = (index: number) => {
		inviteesList.value.splice(index, 1)
	}

</script>

<template>

	<div
		class="newChan-contentWrap"
		:class="{'ContentWrap--protected': protectedStatus}"
	>
		<div class="Content-btns">
			<SwitchBtn
				value="Invitees"
				:selected="sectionSelected == 'Invitees'"
				:logo="logoFriends"
				height="44em"
				@click="sectionSelected = 'Invitees'"
			/>

			<SwitchBtn
				value="Add"
				:selected="sectionSelected == 'Add'"
				:logo="logoAdd"
				height="44em"
				@click="sectionSelected = 'Add'"
			/>
		</div>

		<SearchInput @search="(val) => toFind = val"/>

		<div class="newChan-content">
			<UserTag
				v-for="(user, index) in list"
				:key="index"
				:section="sectionSelected"
				:user="user"
				@add="addUser"
				@delete="deleteUser(index)"
			/>
			<span
				class="Content-noResult"
				v-if="toFind && !dataState.loading && !list?.length"
			>
				No results.
			</span>
		</div>
	</div>

</template>