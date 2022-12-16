<script setup lang="ts">

	import { reactive, ref, computed, watch } from 'vue'
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
				name: 'Karim',
				level: 200,
				levelPerCent: 12,
				score: 4
			},
			player2: {
				name: 'Kylian',
				level: 197,
				levelPerCent: 66,
				score: 3
			},
			begin: 16
		},
		{
			player1: {
				name: 'Antoine',
				level: 158,
				levelPerCent: 20,
				score: 2
			},
			player2: {
				name: 'Ousmane',
				level: 152,
				levelPerCent: 95,
				score: 2
			},
			begin: 13
		},
		{
			player1: {
				name: 'Kingsley',
				level: 140,
				levelPerCent: 32,
				score: 4
			},
			player2: {
				name: 'Raphael',
				level: 134,
				levelPerCent: 84,
				score: 1
			},
			begin: 12
		},
		{
			player1: {
				name: 'Benjamin',
				level: 104,
				levelPerCent: 8,
				score: 1
			},
			player2: {
				name: 'Theo',
				level: 100,
				levelPerCent: 71,
				score: 1
			},
			begin: 8
		},
		{
			player1: {
				name: 'Lucas',
				level: 84,
				levelPerCent: 60,
				score: 2
			},
			player2: {
				name: 'Adrien',
				level: 78,
				levelPerCent: 89,
				score: 1
			},
			begin: 7
		},
		{
			player1: {
				name: 'Alphonse',
				level: 43,
				levelPerCent: 37,
				score: 1
			},
			player2: {
				name: 'Steve',
				level: 21,
				levelPerCent: 21,
				score: 3
			},
			begin: 3
		}
	])

	const		order = ref('des')
	const		page = ref(1)
	const		dataIndex = ref(0)
	const		toFind = ref('')
	const		perPage = ref(12)

	const	dataSorted = computed(() => data.sort((a, b) => {
				if (order.value == 'des')
					return a.begin - b.begin
				else
					return b.begin - a.begin
			}
		)
	)

	const	inputRes = computed(() => {
		return dataSorted.value.filter(game => game.player1.name.toLowerCase().includes(toFind.value.toLowerCase())
												|| game.player2.name.toLowerCase().includes(toFind.value.toLowerCase()))
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
				inputHeight="56rem"
				@search="(val) => toFind = val"
			/>
			<div class="Filters-menus">
				<DropDownMenu
					value="Per page:"
					:options="['12', '24', '36', '48']"
					width="165rem"
					height="56rem"
					:logo="logoPerPage"
					@select="(val) => perPage = parseInt(val)"
				/>
				<DropDownMenu
					value="Sort by:"
					:options="['Recent', 'Ancient']"
					width="205rem"
					height="56rem"
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
