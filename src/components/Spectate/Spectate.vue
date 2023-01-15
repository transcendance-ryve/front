<script setup lang="ts">

	import { onMounted, onUnmounted, reactive, computed, watch } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '@/stores/UserStore'
	import SearchInput from '../Utils/SearchInput.vue'
	import { logoDesc, logoAsc } from '../../assets/logoSVG'
	import { getSpectate } from '@/requests/Spectate/getSpectate'
	import type { Game, SpectateData, SpectateQueries, queriesKeys } from '@/types/Spectate'
	import VersusTag from './VersusTag.vue'
	import router from '@/router/index'
	import { type LocationQuery, onBeforeRouteUpdate } from 'vue-router'

	const	contentStore = useContentStore()
	contentStore.state = 3

	const	data: SpectateData = reactive({
		gamesData: [],
		loadingData: false,
		err: null,
	})

	let		routeUpdating: boolean = false
	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	listerners: any[] = []

	const	queries: SpectateQueries = reactive({
		order: 'desc',
		search: ''
	})

	const	getUrlQueries = (urlQueries: LocationQuery) => {
		const	queriesNames: queriesKeys[] = ['order', 'search']

		for (let i: number = 0; i < queriesNames.length; i++) {
			const	val = urlQueries[queriesNames[i]] as string
			queries[queriesNames[i]] = val ? val : ''
		}
	}

	const	checkQueries = () => {
		if (queries.order !== 'desc' && queries.order !== 'asc')
			queries.order = 'desc'
	}

	const	inputRes = computed(() => {
		return data.gamesData.filter(game => game.players.left.username!.toLowerCase().includes(queries.search.toLowerCase())
							|| game.players.right.username!.toLowerCase().includes(queries.search.toLowerCase()))
	})

	const	games = computed(() => {
		if (queries.search)
			return queries.order === 'desc' ? inputRes.value : inputRes.value.reverse()
		else
			return queries.order === 'desc' ? data.gamesData : data.gamesData.reverse()
	})

	const	replaceUrl = async () => {
		let	newQueries: Partial<SpectateQueries> = { ...queries }

		if (!newQueries.search)
			delete newQueries.search
		await router.push({ query: newQueries})
	}

	watch(queries, async () => {
		if (!routeUpdating)
			await replaceUrl()
	})

	onBeforeRouteUpdate(async (to, from) => {
		if (Object.keys(to.query).length === 0)
			return false
		routeUpdating = true
		if (to.query !== from.query) {
			getUrlQueries(to.query)
			checkQueries()
		}
		await getSpectate(data)
		routeUpdating = false
	})


	onMounted(async () => {
		getUrlQueries(router.currentRoute.value.query)
		checkQueries()
		await getSpectate(data)
		socket.emit('onSpectate')
		listerners.push(socket.on('newGameStarted', (game: Game) => data.gamesData.unshift(game)))
		listerners.push(socket.on('gameEnded', (gameId: string) => data.gamesData = data.gamesData.filter(game => game.id !== gameId)))
		listerners.push(socket.on('updateScore', (res: any) => {
			console.log('in updateScore', res)
			// const	game = data.gamesData.find(game => game.id === gameId)
			// if (game && )
			// 	game.score = score
		}))
		//	updateScore(gameId, { id, score })
	})

	onUnmounted(() => {
		listerners.forEach(listener => socket.off(listener))
		socket.emit('offSpectate')
	})

</script>

<template>

	<div class="mainContent-spectate">
		<div class="Spectate-filters">
			<SearchInput
				:defaultValue="queries.search"
				inputBackground="#242635"
				inputHeight="56em"
				@search="(val) => queries.search = val"
			/>
			<div class="Filters-menus">
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
				v-for="(game, index) in games"
				:key=index
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
	</div>

</template>
