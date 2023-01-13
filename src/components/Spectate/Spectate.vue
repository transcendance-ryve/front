<script setup lang="ts">

	import { reactive, ref, computed, watch, type Ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoSort } from '../../assets/logoSVG'
	import VersusTag from './VersusTag.vue'
	import PagesSelector from '../Utils/PagesSelector.vue'

	const	contentStore = useContentStore()
	contentStore.state = 3

	const	data = reactive([
		{
			player1: {
				avatar: "http://localhost:3000/default.png",
				username: 'Karim',
				level: 200,
				experience: 12,
				next_level: 100,
				score: 4
			},
			player2: {
				avatar: "http://localhost:3000/default.png",
				username: 'Kylian',
				level: 197,
				experience: 66,
				next_level: 100,
				score: 3
			},
			begin: 16
		},
		{
			player1: {
				avatar: "http://localhost:3000/default.png",
				username: 'Antoine',
				level: 158,
				experience: 20,
				next_level: 100,
				score: 2
			},
			player2: {
				avatar: "http://localhost:3000/default.png",
				username: 'Ousmane',
				level: 152,
				experience: 95,
				next_level: 100,
				score: 2
			},
			begin: 13
		},
		{
			player1: {
				avatar: "http://localhost:3000/default.png",
				username: 'Kingsley',
				level: 140,
				experience: 32,
				next_level: 100,
				score: 4
			},
			player2: {
				avatar: "http://localhost:3000/default.png",
				username: 'Raphael',
				level: 134,
				experience: 84,
				next_level: 100,
				score: 1
			},
			begin: 12
		},
		{
			player1: {
				avatar: "http://localhost:3000/default.png",
				username: 'Benjamin',
				level: 104,
				experience: 8,
				next_level: 100,
				score: 1
			},
			player2: {
				avatar: "http://localhost:3000/default.png",
				username: 'Theo',
				level: 100,
				experience: 71,
				next_level: 100,
				score: 1
			},
			begin: 8
		},
		{
			player1: {
				avatar: "http://localhost:3000/default.png",
				username: 'Lucas',
				level: 84,
				experience: 60,
				next_level: 100,
				score: 2
			},
			player2: {
				avatar: "http://localhost:3000/default.png",
				username: 'Adrien',
				level: 78,
				experience: 89,
				next_level: 100,
				score: 1
			},
			begin: 7
		},
		{
			player1: {
				avatar: "http://localhost:3000/default.png",
				username: 'Alphonse',
				level: 43,
				experience: 37,
				next_level: 100,
				score: 1
			},
			player2: {
				avatar: "http://localhost:3000/default.png",
				username: 'Steve',
				level: 21,
				experience: 21,
				next_level: 100,
				score: 3
			},
			begin: 3
		}
	])

	const		order: Ref<string> = ref('des')
	const		page: Ref<number> = ref(1)
	const		dataIndex: Ref<number> = ref(0)
	const		toFind: Ref<string> = ref('')
	const		perPage: Ref<number> = ref(12)

	const	dataSorted = computed(() => data.sort((a, b) => {
				if (order.value == 'des')
					return a.begin - b.begin
				else
					return b.begin - a.begin
			}
		)
	)

	const	inputRes = computed(() => {
		return dataSorted.value.filter(game => game.player1.username.toLowerCase().includes(toFind.value.toLowerCase())
												|| game.player2.username.toLowerCase().includes(toFind.value.toLowerCase()))
	})

	const	games = computed(() => {
		if (toFind.value)
		{
			const	len = dataIndex.value + perPage.value < inputRes.value.length ?
				dataIndex.value + perPage.value : inputRes.value.length
			return inputRes.value.slice(dataIndex.value, len)
		}
		else {
			const	len = dataIndex.value + perPage.value < dataSorted.value.length ?
				dataIndex.value + perPage.value : dataSorted.value.length
			return dataSorted.value.slice(dataIndex.value, len)
		}
	})

	const	pagesSize = computed(() => {
		let	res = Math.round(data.length / perPage.value)
		if (data.length / perPage.value > res)
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

	<div class="mainContent-spectate">
		<div class="Spectate-filters">
			<SearchInput
				inputBackground="#242635"
				inputHeight="56em"
				@search="(val) => toFind = val"
			/>
			<div class="Filters-menus">
				<DropDownMenu
					label="Per page:"
					:selectValue="perPage.toString()"
					:options="['12', '24', '36', '48']"
					width="165em"
					height="56em"
					:logo="logoPerPage"
					@select="(val) => perPage = parseInt(val)"
				/>
				<DropDownMenu
					label="Sort by:"
					:selectValue="order"
					:options="['Recent', 'Ancient']"
					width="205em"
					height="56em"
					:logo="logoSort"
					@select="(val) => order = val == 'Recent' ? 'des' : 'asc'"
				/>
			</div>
		</div>
		<div
			class="Spectate-content"
			:class="{'Spectate-content--maxSize': pagesSize == 1}"
		>
			<div
				class="Content-Versus"
				v-for="(game, index) in games"
				:key=index
			>
				<VersusTag
					:user="game.player1"
				/>
				<VersusTag
					:user="game.player2"
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
