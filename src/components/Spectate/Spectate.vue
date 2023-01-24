<script setup lang="ts">

	import { onMounted, onUnmounted, reactive, watch, ref, type Ref, nextTick } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '@/stores/UserStore'
	import { useSidebarStore } from '@/stores/SidebarStore'
	import SearchInput from '../Utils/SearchInput.vue'
	import { logoDesc, logoAsc } from '../../assets/logoSVG'
	import LoaderSpinner from '../Utils/LoaderSpinner.vue'
	import { getQueriesInUrl, replaceUrl, getSpectate } from '@/requests/Spectate/getSpectate'
	import type { SpectateData, SpectateQueries, queriesKeys } from '@/types/Spectate'
	import VersusTag from './VersusTag.vue'
	import router from '@/router/index'
	import { type LocationQuery, onBeforeRouteUpdate } from 'vue-router'
	import type { SocketEvent } from '@/types/Socket'
	import Game from '../Play/Game.vue'

	const	contentStore = useContentStore()
	contentStore.state = 3
	const	sbStore = useSidebarStore()
	const	gameSelected: Ref<string> = ref("")
	const	data: SpectateData = reactive({
		games: [],
		count: 1,
		loadingData: false,
		err: null,
	})
	let		apiCalled: boolean = false
	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	queries: SpectateQueries = reactive({
		order: 'desc',
		search: ''
	})
	let	page: number = 0

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

	watch(queries, async () => {
		if (!apiCalled)
			await replaceUrl({...queries})
	})

	watch(sbStore.spectate, () => {
		if (sbStore.spectate.gameId) {
			spectateGame(sbStore.spectate.gameId)
			sbStore.spectate.gameId = ''
		}
	})

	onBeforeRouteUpdate(async (to, from) => {
		if (Object.keys(to.query).length === 0)
			return false
		apiCalled = true
		if (to.query !== from.query)
			getUrlQueries(to.query)
		page = 0
		getSpectate(getQueriesInUrl(to.fullPath), page++, data)
		await nextTick()
		apiCalled = false
	})

	const	listerners: SocketEvent[] = [
		{
			name: 'newGameStarted',
			callback: (game: any) => {
				if (!data.games.find(g => g.id === game.id))
					data.games.unshift(game)
			}
		},
		{
			name: 'gameEnded',
			callback: (gameId: string) => data.games = data.games.filter(game => game.id !== gameId)
		},
		{
			name: 'updateScore',
			callback: (gameId: string, player: {id: string, score: number}) => {
				const	game = data.games.find(game => game.id === gameId)
				if (game)
					player.id === game.players.left.id ?
					game.players.left.score = player.score : game.players.right.score = player.score
			}
		}
	]

	onMounted(() => {
		getUrlQueries(router.currentRoute.value.query)
		checkQueries()
		getSpectate(getQueriesInUrl(router.currentRoute.value.fullPath), page++, data)
		socket.emit('onSpectate')
		listerners.forEach(listener => socket.on(listener.name, listener.callback))
		if (sbStore.spectate.gameId) {
			spectateGame(sbStore.spectate.gameId)
			sbStore.spectate.gameId = ''
		}
	})

	onUnmounted(() => {
		listerners.forEach(listener => socket.off(listener.name, listener.callback))
		socket.emit('offSpectate')
	})

	const spectateGame = (gameID: string) => {
		socket.emit('spectateGame', { gameId: gameID });
		gameSelected.value = gameID;
	}

	const	handleScroll = async (e: any) => {
		if (e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight) {
			if (!apiCalled && data.games.length < data.count) {
				apiCalled = true
				getSpectate(getQueriesInUrl(router.currentRoute.value.fullPath), page++, data)
				await nextTick()
				apiCalled = false
			}
		}
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
				<button
					class="OrderBtn"
					:class="{'OrderBtn--selected': queries.order === 'desc'}"
					@click="queries.order ='desc'"
				>
					<span class="OrderBtn-logo" v-html="logoDesc"></span>
				</button>
				<button
					class="OrderBtn"
					:class="{'OrderBtn--selected': queries.order === 'asc'}"
					@click="queries.order = 'asc'"
				>
					<span class="OrderBtn-logo" v-html="logoAsc"></span>
				</button>
			</div>
		</div>
		<div
			v-if="!data.err"
			class="Spectate-content"
			@scroll="handleScroll"
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
			<LoaderSpinner size="30em" v-if="data.loadingData"/>
			<span
					class="Content-noResult"
					v-if="!data.loadingData && !data.err && !data.games.length"
				>
					No results
			</span>
		</div>
	</div>
</template>
