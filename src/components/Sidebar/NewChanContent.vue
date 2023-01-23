<script setup lang="ts">

	import { ref, reactive, computed, watch, type Ref, withDefaults } from 'vue'
	import { logoFriends, logoAdd } from '../../assets/logoSVG'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import UserTag from './UserTag.vue'
	import LoaderSpinner from '../Utils/LoaderSpinner.vue'
	import type { TargetTag } from '@/types/User'
	import { useUserStore } from '@/stores/UserStore'
	import getUsers from '@/requests/Sidebar/getUsers'
	import type { axiosState } from '@/requests/useAxios'
	import { profileRedirect } from '@/router/index'

	export interface Props {
		protectedStatus: boolean,
		invitees: string[]
	}

	const props = withDefaults(defineProps<Props>(), {
		protectedStatus: false,
	})

	const	userStore = useUserStore()

	const	sectionSelected = ref('Invitees')
	const	toFind = ref('')
	const	inviteesList: Ref<TargetTag[]> = ref([])
	const	addList: Ref<TargetTag[]> = ref([])
	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})

	const	isInvited = (user: TargetTag) => {
		for (let i = 0; i < inviteesList.value.length; i++)
			if (inviteesList.value[i].id === user.id)
				return true
		return false
	}

	watch(toFind, async () => {
		if (toFind.value && sectionSelected.value === 'Add') {
			addList.value = await getUsers(toFind.value, dataState)
			addList.value = addList.value.filter(user => {
				return !isInvited(user) && user.id !== userStore.me.id
			})
		}
	})

	watch(sectionSelected, async () => {
		if (sectionSelected.value === 'Add' && toFind.value) {
			addList.value = await getUsers(toFind.value, dataState)
			addList.value = addList.value.filter(user => {
				return !isInvited(user) && user.id !== userStore.me.id
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

	const	addUser = (user: TargetTag) => {
		inviteesList.value.unshift(user)
		props.invitees.unshift(user.id)
		addList.value.splice(addList.value.indexOf(user), 1)
	}

	const	deleteUser = (index: number) => {
		inviteesList.value.splice(index, 1)
		props.invitees.splice(index, 1)
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
				:selected="sectionSelected === 'Invitees'"
				:logo="logoFriends"
				height="44em"
				@click="sectionSelected = 'Invitees'"
			/>

			<SwitchBtn
				value="Add"
				:selected="sectionSelected === 'Add'"
				:logo="logoAdd"
				height="44em"
				@click="sectionSelected = 'Add'"
			/>
		</div>

		<SearchInput @search="(val) => toFind = val"/>

		<div class="newChan-content" v-if="!dataState.error">
			<UserTag
				v-for="(user, index) in list"
				:key="index"
				:section="sectionSelected"
				:user="user"
				@add="addUser"
				@delete="deleteUser(index)"
				@see="(user) => profileRedirect(user.id)"
			/>
			<LoaderSpinner size="30em" v-if="dataState.loading"/>
			<span
				class="Content-noResult"
				v-if="toFind && !dataState.loading && !list?.length"
			>
				No results
			</span>
		</div>
	</div>

</template>