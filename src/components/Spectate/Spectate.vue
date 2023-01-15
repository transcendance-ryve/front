<script setup lang="ts">

	import { onMounted, onUnmounted, reactive, computed, watch, ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '@/stores/UserStore'
	import SearchInput from '../Utils/SearchInput.vue'
	import DropDownMenu from '../Utils/DropDownMenu.vue'
	import { logoPerPage, logoDesc, logoAsc } from '../../assets/logoSVG'
	import PagesSelector from '../Utils/PagesSelector.vue'
	import { getQueriesInUrl, replaceUrl, getSpectate } from '@/requests/Spectate/getSpectate'
	import type { SpectateData, SpectateQueries, queriesKeys } from '@/types/Spectate'
	import VersusTag from './VersusTag.vue'
	import router from '@/router/index'
	import { type LocationQuery, onBeforeRouteUpdate } from 'vue-router'
	import Game from '../Play/Game.vue'

	const	contentStore = useContentStore()
	contentStore.state = 3

	const	menuTake: string[] = ['10', '20', '50', '100']
	const	data: SpectateData = reactive({
		games: [],
		count: 0,
		loadingData: false,
		err: null,
	})
	let		routeUpdating: boolean = false
	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	listerners: any[] = []

	const	queries: SpectateQueries = reactive({
		page: '1',
		take: '10',
		order: 'desc',
		search: ''
	})

	const gameSelected = ref("");

	const	getUrlQueries = (urlQueries: LocationQuery) => {
		const	queriesNames: queriesKeys[] = ['page', 'take', 'order', 'search']

		for (let i: number = 0; i < queriesNames.length; i++) {
			const	val = urlQueries[queriesNames[i]] as string
			queries[queriesNames[i]] = val ? val : ''
		}
	}

	const	checkQueries = () => {
		const	page: number = parseInt(queries.page)
		if (isNaN(page) || page < 1)
			queries.page = '1'
		if (!menuTake.includes(queries.take)) {
			const	takeVal: number = parseInt(queries.take)
			if (isNaN(takeVal) || takeVal < 1)
				queries.take = '10'
			else if (takeVal > 100)
				queries.take = '100'
		}
		if (queries.order !== 'desc' && queries.order !== 'asc')
			queries.order = 'desc'
	}

	const	pagesCount = computed(() => {
		const	takeValue = parseInt(queries.take)
		let	res: number = Math.round(data.count / takeValue)
		if (data.count / takeValue > res)
			res++
		return res
	})

	const	updatePage = (n: number) => {
		const	page: string = n.toString()
		page ? queries.page = page : queries.page = '1'
	}

	watch(queries, async () => {
		if (!routeUpdating)
			await replaceUrl({...queries})
	})

	watch(pagesCount, newVal => {
		if (parseInt(queries.page) > newVal)
			updatePage(newVal)
	})

	onBeforeRouteUpdate(async (to, from) => {
		if (Object.keys(to.query).length === 0)
			return false
		routeUpdating = true
		if (to.query !== from.query)
			getUrlQueries(to.query)
		await getSpectate(getQueriesInUrl(to.fullPath), data)
		routeUpdating = false
	})

	onMounted(() => {
		getUrlQueries(router.currentRoute.value.query)
		checkQueries()
		getSpectate(getQueriesInUrl(router.currentRoute.value.fullPath), data)
		socket.emit('onSpectate')
		listerners.push(socket.on('newGameStarted', (game: any) => data.games.unshift(game)))
		listerners.push(socket.on('gameEnded', (gameId: string) => data.games = data.games.filter(game => game.id !== gameId)))
		listerners.push(socket.on('updateScore', (gameId: string, player: {id: string, score: number}) => {
			const	game = data.games.find(game => game.id === gameId)
			if (game)
				player.id === game.players.left.id ?
				game.players.left.score = player.score : game.players.right.score = player.score
		}))
	})

	onUnmounted(() => {
		listerners.forEach(listener => socket.off(listener))
		socket.emit('offSpectate')
	})

	const spectateGame = (gameID: string) => {
		socket.emit('spectateGame', { gameId: gameID });

		gameSelected.value = gameID;
	}
</script>

<template>
	<Game
		v-if="gameSelected !== ''"
		:spectate="true"
		:close="() => gameSelected = ''"
		:gameID="gameSelected"
	/>

	<div v-if="!gameSelected" class="mainContent-spectate">
		<div class="Spectate-filters">
			<SearchInput
				:defaultValue="queries.search"
				inputBackground="#242635"
				inputHeight="56em"
				@search="(val) => queries.search = val"
			/>
			<div class="Filters">
				<DropDownMenu
					label="Per page:"
					:options="menuTake"
					:selectValue="queries.take"
					width="165em"
					height="56em"
					:logo="logoPerPage"
					@select="(value) => queries.take = value"
				/>
				<div class="Filters-orderBtns">
					<button
						class="OrderBtn"
						:class="{'OrderBtn--selected': queries.order === 'desc'}"
						@click="queries.order ='desc'"
					>
						<span class="OrderBtn-logo" v-html="logoDesc"></span>
					</button>
					<button
						class="OrderBtn"
						:class="{'OrderBtn--selected': queries.order == 'asc'}"
						@click="queries.order = 'asc'"
					>
						<span class="OrderBtn-logo" v-html="logoAsc"></span>
					</button>
				</div>
			</div>
		</div>
		<div
			v-if="!data.loadingData && !data.err"
			class="Spectate-content"
		>
			<div
				class="Content-Versus"
				v-for="(game, index) in data.games"
				:key=index
				@click="spectateGame(game.id)"
			>
				<VersusTag
					:player="game.players.left"
				/>
				<VersusTag
					:player="game.players.right"
					:reverse="true"
				/>
			</div>
		</div>
		<PagesSelector
			v-if="!data.err && !data.loadingData"
			:page="parseInt(queries.page)"
			:pagesSize="pagesCount"
			@update="updatePage"
		/>
	</div>
</template>
