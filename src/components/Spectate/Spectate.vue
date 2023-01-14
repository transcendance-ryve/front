<script setup lang="ts">

	import { onMounted, reactive, ref, computed, watch, type Ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage } from '../../assets/logoSVG'
	import { getSpectate } from '@/requests/Spectate/getSpectate'
	import type { SpectateData } from '@/types/Spectate'
	import VersusTag from './VersusTag.vue'
	import PagesSelector from '../Utils/PagesSelector.vue'
	import type { Player, Players } from '@/types/User'

	const	contentStore = useContentStore()
	contentStore.state = 3

	const	users: Player[] = [
		{
			id: '234',
			avatar: "http://localhost:3000/default.png",
			username: 'Karim',
			level: 200,
			experience: 12,
			next_level: 100,
			score: 1,
		},
		{
			id: '24',
			avatar: "http://localhost:3000/default.png",
			username: 'Kylian',
			level: 197,
			experience: 66,
			next_level: 100,
			score: 2,
		},
		{
			id: '2',
			avatar: "http://localhost:3000/default.png",
			username: 'Antoine',
			level: 158,
			experience: 20,
			next_level: 100,
			score: 3,
		},
		{
			id: '3',
			avatar: "http://localhost:3000/default.png",
			username: 'Ousmane',
			level: 152,
			experience: 95,
			next_level: 100,
			score: 4,
		},
		{
			id: '4',
			avatar: "http://localhost:3000/default.png",
			username: 'Benjamin',
			level: 104,
			experience: 8,
			next_level: 100,
			score: 1,
		},
		{
			id: '5',
			avatar: "http://localhost:3000/default.png",
			username: 'Theo',
			level: 100,
			experience: 71,
			next_level: 100,
			score: 0,
		},
		{
			id: '6',
			avatar: "http://localhost:3000/default.png",
			username: 'Lucas',
			level: 84,
			experience: 60,
			next_level: 100,
			score: 0,
		},
		{
			id: '7',
			avatar: "http://localhost:3000/default.png",
			username: 'Adrien',
			level: 78,
			experience: 89,
			next_level: 100,
			score: 5,
		},
		{
			id: '8',
			avatar: "http://localhost:3000/default.png",
			username: 'Alphonse',
			level: 43,
			experience: 37,
			next_level: 100,
			score: 0,
		},
		{
			id: '9',
			avatar: "http://localhost:3000/default.png",
			username: 'Steve',
			level: 21,
			experience: 21,
			next_level: 100,
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

	const	order: Ref<string> = ref('des')
	const	page: Ref<number> = ref(1)
	const	dataIndex: Ref<number> = ref(0)
	const	toFind: Ref<string> = ref('')
	const	perPage: Ref<number> = ref(12)
	const	data: SpectateData = reactive({
		games: [],
		count: 0,
		loadingData: false,
		err: null
	})


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

	onMounted(async () => {
		getSpectate(data)
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
