<script setup lang="ts">

	import { computed, reactive } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '@/stores/UserStore'
	import VersusTag from '../Spectate/VersusTag.vue'
	import MmBtns from './MmBtns.vue'
	// import Btn1 from '../Utils/Btn1.vue';

	const	contentStore = useContentStore()
	contentStore.state = 1

	const	userStore = useUserStore()

	const	versus = {
		player1: userStore.me,
		player2: {
			avatar: "http://localhost:3000/default.png",
			username: 'RYVE',
			level: 0,
			experience: 0,
			next_level: 100,
			score: 0
		},
		begin: 16
	}

	interface matchMaking {
		label: string,
		start: boolean,
		startTimer: Date | null,
		time: string,
		intervalID: number,
		gameFound: boolean
	}

	const	mm: matchMaking = reactive({
		label: 'Matchmaking',
		start: false,
		startTimer: null,
		time: '',
		intervalID: 0,
		gameFound: false
	})

	const	startMatchMaking = () => {
		mm.startTimer = new Date()
		mm.start = true
		mm.intervalID = setInterval(timerRunning, 10)
	}

	const	cancelMatchMaking = () => {
		mm.label = 'Matchmaking'
		mm.start = false
		mm.startTimer = null
		mm.time = ''
		clearInterval(mm.intervalID)
		mm.gameFound = false
	}

	const	launchGame = () => {
		alert('Start game')
	}

	const	zeroPrefix = (num: number, digit: number) => {
		let zero = '';
		for (let i = 0; i < digit; i++) {
			zero += '0';
  		}
		return (zero + num).slice(-digit);
	}

	const	timerRunning = () => {
		const	currentTime: Date = new Date(),
		timeElapsed: Date = new Date(currentTime.getTime() - (mm.startTimer?.getTime() || 0)),
		hour: number = timeElapsed.getUTCHours(),
		min: number = timeElapsed.getUTCMinutes(),
		sec: number = timeElapsed.getUTCSeconds()

		if (sec === 10)	{	//	found game simulation
			mm.gameFound = true
			mm.label = 'Game found!'
		}
		mm.time = hour ? hour.toString() + ':' : ''
		+ min.toString() + ':'
		+ zeroPrefix(sec, 2)
	}

</script>

<template>

	<div class="Play-matchMaking">
		<div class="MatchMaking-versus">
			<VersusTag :user="versus.player1"/>
			<VersusTag :user="versus.player2" :reverse="true"/>
		</div>
		<div class="MatchMaking-game">
			<div class="Game-side Game-leftSide"></div>
			<div class="Game-side Game-rightSide"></div>
		</div>
		<div class="MatchMaking-modal">
			<div class="Modal-label">
				<span class="Label">{{ mm.label }}</span>
				<span
					class="Label-children"
					:class="{
						'Label-estimation': !mm.start,
						'Label-time': mm.start,
						'Label-ready': mm.gameFound
					}">
					{{ mm.gameFound ? '' : mm.time || '30 seconds' }}
				</span>
				<div class="Modal-loader" v-if="mm.start && !mm.gameFound">
					<div
						v-for="n in 3"
						class="Loader-bar"
						:key="n"
					>
					</div>
				</div>
			</div>
			<MmBtns
				:start="mm.start"
				:gameFound="mm.gameFound"
				@start="startMatchMaking()"
				@cancel="cancelMatchMaking()"
				@accept="launchGame()"
				@refuse="cancelMatchMaking()"
			/>
		</div>
	</div>

</template>
