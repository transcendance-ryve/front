<script setup lang="ts">
	import { reactive, onMounted, ref, onUnmounted } from 'vue'
	import Btn from '../Utils/Btn.vue';
	import { useUserStore } from '@/stores/UserStore';
	import moment from 'moment';
	import ToggleSwitch from '../Settings/ToggleSwitch.vue';

	const userStore = useUserStore()
	const socket = userStore.socket

	interface Props {
		close: () => void;
	}
	const props: Props = defineProps<Props>();

	enum State {
		Matchmaking,
		Waiting,
		Found,
		Accepted
	}

	let state: any = ref(State.Matchmaking);
	let bonus: any = ref(false);
	let usersInQueue: any = reactive({
		bonus: 0,
		normal: 0
	});

	const timer: any = reactive({
		onStart: 0,
		elapsed: 0,
		interval: 0
	})

	const startTimer = (startTime: number, timeLeft: boolean = false) => {
		timer.onStart = startTime;

		timer.interval = setInterval(() => {
			if (timeLeft)
				timer.elapsed = timer.onStart - Date.now();
			else
				timer.elapsed = Date.now() - timer.onStart;
		}, 1000);
	}

	const clearTimer = () => {
		if (timer.interval) clearInterval(timer.interval);
		timer.onStart = 0;
		timer.elapsed = 0;
	}

	const listeners: any = {
		joined_queue: () => {
			clearTimer();
			startTimer(Date.now());
			state.value = State.Waiting;
		},
		game_request: () => {
			clearTimer();
			timer.elapsed = 29000;
			startTimer(Date.now() + 30000, true);
			state.value = State.Found;
		},
		left_queue: () => {
			state.value = State.Matchmaking;
			clearTimer();
		},
		game_accepted: () => {
			props.close();
		},
		accepted_game_request: () => {
			state.value = State.Accepted;
		},
		matchmaking_queue_count: ({ bonus, normal }: {bonus: number, normal: number }) => {
			usersInQueue.bonus = bonus;
			usersInQueue.normal = normal;
		}
	}

	onMounted(() => {
		for (let name in listeners) {
			socket.on(name, listeners[name]);
		}
	});

	onUnmounted(() => {
		for (let name in listeners) {
			socket.off(name, listeners[name]);
		}

		socket.emit("leave_queue")
	});

	const decline = () => {
		socket.emit("decline_game_request", { matchmaking: true });
		state.value = State.Matchmaking;
	}

	const accept = () => {
		socket.emit("accept_game_request", { matchmaking: true });
	}

	const toggleMatchmaking = () => {
		if (state.value === State.Matchmaking) socket.emit("join_queue", { bonus: bonus.value });
		else if (state.value === State.Accepted) decline()
		else socket.emit("leave_queue");
	}
</script>

<template>
	<div
		class="matchmaking_content"
	>
		<div class="matchmaking_content__header">
			<h1>
				Matchmaking
			</h1>
			<h2 v-if="state === State.Matchmaking">Your estimated matchaking time is: <span>under 30 seconds</span></h2>
			<h2
				v-if="state === State.Waiting || state === State.Found || state === State.Accepted"
			>
				{{ state === State.Waiting ? "In queue since: " : "" }}
				{{ state === State.Found ? "Time to accept or refuse the request: " : "" }}
				{{ state === State.Accepted ? "Waiting for your opponent's answer: " : "" }}
				<span>
					{{ moment(timer.elapsed).format("mm:ss") }}
				</span>
			</h2>
			<div class="matchmaking_content__header_loader" v-if="state === State.Waiting">
				<span
					v-for="n in 3"
					:key="n"
				>
				</span>
			</div>
		</div>
		<div class="matchmaking_content__btns">
			<div v-if="state === State.Matchmaking">
				<h2>Active bonus:</h2>
				<ToggleSwitch :active="bonus" @click="bonus = !bonus" />
			</div>

			<Btn
				v-if="state === State.Matchmaking || state === State.Waiting || state === State.Accepted"
				:value="state === State.Matchmaking ? 'Start game' : 'Cancel'"
				:class="{ btn_red: state === State.Waiting || state === State.Accepted }"
				fontSize="18em"
				width="150em"
				height="50em"
				@click="toggleMatchmaking"
			/>
			<div v-if="state === State.Found">
				<Btn
					value="Accept"
					fontSize="18em"
					width="150em"
					height="50em"
					@click="accept"
				/>
				<Btn
					class="btn_red"
					value="Decline"
					fontSize="18em"
					width="150em"
					height="50em"
					@click="decline"
				/>
			</div>
			
			<p
				v-if="state === State.Matchmaking || state === State.Waiting"
			>
				<span>
					{{ bonus ? usersInQueue.bonus : usersInQueue.normal }}
				</span>
				players in queue
			</p>
		</div>
	</div>
</template>