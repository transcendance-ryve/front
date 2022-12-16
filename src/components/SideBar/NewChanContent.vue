<script setup lang="ts">

	import { ref, reactive, computed, watch } from 'vue'
	import { logoFriends, logoAdd, logoSearch } from '../../assets/logoSVG'
	import SwitchBtn from './SwitchBtn.vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import UserTag from './UserTag.vue'

	const props = defineProps({
		//	1 for Invitess, 2 for Add
		protectedStatus: {
			type: Boolean,
			default: false,
		},
	})

	const	allUsers = reactive([
		'Karim',
		'Kylian',
		'Antoine',
		'Ousmane',
		'Kingsley',
		'Raphael',
		'Benjamin',
		'Theo',
		'Lucas',
		'Adrien',
		'Alphonse',
		'Steve',
		'Olivier'
	])

	const	sectionSelected = ref('Invitees')
	const	toFind = ref('')
	const	inviteesList:string[] = reactive([])
	const	addList = computed(() => allUsers.sort())

	const	inputRes = computed(() => {
		if (sectionSelected.value == 'Invitees')
			return inviteesList.filter(userName => userName.toLowerCase().includes(toFind.value.toLowerCase()))
		else
			return addList.value.filter(userName => userName.toLowerCase().includes(toFind.value.toLowerCase()))
	})

	const	list = computed(() => {
		if (toFind.value)
			return inputRes.value
		else if (sectionSelected.value == 'Invitees')
			return inviteesList
		else
			return addList.value
	})

	const	addUser = (userName: string) => {
		inviteesList.unshift(userName)
		allUsers.splice(allUsers.findIndex(value => value == userName), 1)
	}

	const	deleteUser = (index: number) => {
		allUsers.push(inviteesList[index])
		inviteesList.splice(index, 1)
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

		<SearchInput
			:inputType="3"
			@search="(val) => toFind = val"
		/>

		<div class="newChan-content">
			<UserTag
				v-for="(userName, index) in list"
				:key="index"
				:section="sectionSelected"
				:userName="userName"
				@add="addUser"
				@delete="deleteUser(index)"
			/>
			<span
				class="Content-noResult"
				v-if="toFind && !list.length"
			>
				No results.
			</span>
		</div>
	</div>

</template>