<script setup lang="ts">

	import { reactive, ref, computed, watch, type Ref } from 'vue'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort } from '../../assets/logoSVG'
	import VersusTag from '../Spectate/VersusTag.vue'
	import PagesSelector from '../Utils/PagesSelector.vue'
	import type { Player, Players } from '@/types/User'

	const	users: Partial<Player>[] = [
		{
			id: '234',
			avatar: "http://localhost:3000/default.png",
			username: 'Karim',
			score: 1,
		},
		{
			id: '24',
			avatar: "http://localhost:3000/default.png",
			username: 'Kylian',
			score: 2,
		},
		{
			id: '2',
			avatar: "http://localhost:3000/default.png",
			username: 'Antoine',
			score: 3,
		},
		{
			id: '3',
			avatar: "http://localhost:3000/default.png",
			username: 'Ousmane',
			score: 4,
		},
		{
			id: '4',
			avatar: "http://localhost:3000/default.png",
			username: 'Benjamin',
			score: 1,
		},
		{
			id: '5',
			avatar: "http://localhost:3000/default.png",
			username: 'Theo',
			score: 0,
		},
		{
			id: '6',
			avatar: "http://localhost:3000/default.png",
			username: 'Lucas',
			score: 0,
		},
		{
			id: '7',
			avatar: "http://localhost:3000/default.png",
			username: 'Adrien',
			score: 5,
		},
		{
			id: '8',
			avatar: "http://localhost:3000/default.png",
			username: 'Alphonse',
			score: 0,
		},
		{
			id: '9',
			avatar: "http://localhost:3000/default.png",
			username: 'Steve',
			score: 4,
		},
	]
	const	gamesData: Players[] = reactive([
		{
			left: users[0],
			right: users[1],
		},
		{
			left: users[2],
			right: users[3],
		},
		{
			left: users[4],
			right: users[5],
		},
		{
			left: users[6],
			right: users[7],
		},
		{
			left: users[8],
			right: users[9],
		},
	])

	const		order: Ref<string> = ref('des')
	const		page: Ref<number> = ref(1)
	const		dataIndex: Ref<number> = ref(0)
	const		toFind: Ref<string> = ref('')
	const		perPage: Ref<number> = ref(12)


		const	inputRes = computed(() => {
		return gamesData.filter(game => game.left.username!.toLowerCase().includes(toFind.value.toLowerCase())
							|| game.right.username!.toLowerCase().includes(toFind.value.toLowerCase()))
	})

	const	games = computed(() => {
		if (toFind.value)
		{
			const	len = dataIndex.value + perPage.value < inputRes.value.length ?
				dataIndex.value + perPage.value : inputRes.value.length
			return inputRes.value.slice(dataIndex.value, len)
		}
		else {
			const	len = dataIndex.value + perPage.value < gamesData.length ?
				dataIndex.value + perPage.value : gamesData.length
			return gamesData.slice(dataIndex.value, len)
		}
	})

	const	pagesSize = computed(() => {
		let	res = Math.round(gamesData.length / perPage.value)
		if (gamesData.length / perPage.value > res)
			res++
		return res
	})

	const	updatePage = (n: number) => {
		page.value = n
		dataIndex.value = (n - 1) * perPage.value
	}

	watch(pagesSize, newVal => {
		if (page.value > newVal)
			updatePage(newVal)
	})

</script>

<template>

	<div class="MatchHistory">
		<div class="MatchHistory-filters">
			<SearchInput
				inputBackground="#242635"
				inputHeight="56em"
				@search="(val) => toFind = val"
			/>
			<div class="Filters-menus">
				<DropDownMenu
					value="Per page:"
					:options="['12', '24', '36', '48']"
					width="165em"
					height="56em"
					:logo="logoPerPage"
					@select="(val) => perPage = parseInt(val)"
				/>
				<DropDownMenu
					value="Sort by:"
					:options="['Recent', 'Ancient']"
					width="205em"
					height="56em"
					:logo="logoSort"
					@select="(val) => order = val == 'Recent' ? 'des' : 'asc'"
				/>
			</div>
		</div>
		<div class="MatchHistory-content">
			<div
				class="Content-Versus"
				v-for="(game, index) in games"
				:key=index
			>
				<VersusTag
					:player="game.left"
				/>
				<VersusTag
					:player="game.right"
					:reverse="true"
				/>
			</div>
		</div>
		<PagesSelector
			:page="page"
			:pagesSize="pagesSize"
			@update="updatePage"
		/>
	</div>

</template>
