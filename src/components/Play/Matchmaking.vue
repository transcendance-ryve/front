<script setup lang="ts">
	import { computed, reactive, onMounted, ref, defineProps } from 'vue'
	import Btn from '../Utils/Btn.vue';
	import { useUserStore } from '@/stores/UserStore';
	import moment from 'moment';

	const userStore = useUserStore()
	const socket = userStore.socket;

	interface Props {
		toggle: () => void;
	}
	const props: Props = defineProps<Props>();

	enum State {
		Matchmaking,
		Waiting,
		Found
	}

	let state: any = ref(State.Matchmaking);

	const timer: any = reactive({
		onStart: 0,
		elapsed: 0,
		interval: 0
	})

	const startTimer = () => {
		timer.onStart = Date.now();

		timer.interval = setInterval(() => {
			timer.elapsed = Date.now() - timer.onStart;
		}, 1000);
	}

	const clearTimer = () => {
		clearInterval(timer.interval);
		timer.onStart = 0;
		timer.elapsed = 0;
	}

	onMounted(() => {
		socket.on("joined_queue", () => {
			startTimer();
			state.value = State.Waiting;

			socket.on("found_match", () => {
				state.value = State.Found;
				clearTimer();
			})
		});
		
		socket.on("left_queue", () => {
			state.value = State.Matchmaking;
			clearTimer();
		})
	})

	const toggleMatchmaking = () => {
		if (state.value === State.Matchmaking) socket.emit("join_queue");
		else socket.emit("leave_queue");
	}

	const cancelMatchmaking = () => {
		state.value = State.Matchmaking;
	}
</script>

<template>
	<div
		class="matchmaking_content"
	>
		<button
			style="font-size: 18px; padding: 10px; border-radius: 6px;"
			@click="toggle"
		>
			Dev start
		</button>
		<div class="matchmaking_content__header">
			<h1>
				Matchmaking
			</h1>
			<h2 v-if="state === State.Matchmaking">Your estimated matchaking time is: <span>about 30 secondes</span></h2>
			<h2 v-if="state === State.Waiting">In queue since: <span>{{ moment(timer.elapsed).format("mm:ss") }}</span></h2>
			<div class="matchmaking_content__header_loader" v-if="state === State.Waiting">
				<span
					v-for="n in 3"
					:key="n"
				>
				</span>
			</div>
		</div>
		<div class="matchmaking_content__btns">
			<Btn
				v-if="state === State.Matchmaking || state === State.Waiting"
				:value="state === State.Matchmaking ? 'Start game' : 'Cancel'"
				:class="{ btn_red: state === State.Waiting }"
				fontSize="18px"
				width="150px"
				height="50px"
				@click="toggleMatchmaking"
			/>
			<div v-if="state === State.Found">
				<Btn
					value="Accept"
					fontSize="18px"
					width="150px"
					height="50px"
					@click=""
				/>
				<Btn
					class="btn_red"
					value="Decline"
					fontSize="18px"
					width="150px"
					height="50px"
					@click=""
				/>
			</div>
			<p><span>13</span> players in queue</p>
		</div>
	</div>
</template>