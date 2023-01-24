<script setup lang="ts">
	import VersusTag from '@/components/Spectate/VersusTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { ref, reactive, type Ref, onMounted, onUnmounted } from 'vue';
	import Win from '../Play/Win.vue'
	import type { SocketEvent } from '@/types/Socket';
	import type { UserConnected } from '@/types/User'

	interface Player {
		id: string,
		username: string,
		avatar: string,
		score: number,
		level: number,
		experience: number,
		next_level: number,
	}

	interface Bonus {
		name: string,
		imgURL: string,
		x: number,
		y: number,
		w: number,
		h: number
	}

	interface Players {
		left: Player,
		right: Player,
	}

	interface Keys {
		w: boolean,
		s: boolean,
		up: boolean,
		down: boolean,
	}

	interface Paddles {
		left: {
			x: number,
			y: number,
			width: number,
			height: number,
			color: string,
		},
		right: {
			x: number,
			y: number,
			width: number,
			height: number,
			color: string,
		},
	}

	interface Ball {
		x: number,
		y: number,
		radius: number,
		color: string,
	}

	interface DefaultGrid {
		width: number,
		height: number,
	}

	const userStore = useUserStore()
	const socket = userStore.socket;

	const canvas = ref<HTMLCanvasElement | null>(null);
	let ctx: CanvasRenderingContext2D | null = null;

	const countdown = reactive({
		visible: false,
		time: 0,
		timer: 0,
	});

	let ratio = {
		x: 1,
		y: 1,
	}
	
	let bonus = reactive({
		name: '',
		imgURL: '',
		x: 0,
		y: 0,
		w: 0,
		h: 0,
		spawned: false,
	});

	const bonusImg = new Image();

	const endState = reactive({
		visible: false,
		state: "win",
		player: {
			id: 'wdwadwad',
			username: 'Sethhh',
			avatar: 'http://localhost:3000/avatars/default.png',
			color: "#ff0000"
		},
	});

	interface Props {
		spectate?: boolean,
		close: () => void,
		gameID?: string,
	}

	const props: Props = defineProps<Props>();

	const players: Ref<Players> = ref({
		left: {
			id: '',
			username: 'Player 1',
			avatar: 'http://localhost:3000/avatars/default.png',
			score: 0,
			level: 1,
			experience: 0,
			next_level: 100,
		},
		right: {
			id: '',
			username: 'Player 2',
			avatar: 'http://localhost:3000/avatars/default.png',
			score: 0,
			level: 1,
			experience: 0,
			next_level: 100,
		},
	})

	const defaultGrid: DefaultGrid = {
		width: 790,
		height: 390,
	};

	const keys: Keys = {
		w: false,
		s: false,
		up: false,
		down: false,
	}

	const handleKeyup = (e: any) => {
		switch (e.key) {
			case 'w':
				keys.w = false;
				socket.emit('keyrelease', 'up');
				break;
			case 's':
				keys.s = false;
				socket.emit('keyrelease', 'down');
				break;
			case 'ArrowUp':
				keys.up = false;
				socket.emit('keyrelease', 'up');
				break;
			case 'ArrowDown':
				keys.down = false;
				socket.emit('keyrelease', 'down');
				break;
		}
	}

	const handleKeydown = (e: any) => {
		switch (e.key) {
			case 'w':
				if (keys.w) break;
				keys.w = true;
				socket.emit('keypress', 'up');
				break;
			case 's':
				if (keys.s) break;
				keys.s = true;
				socket.emit('keypress', 'down');
				break;
			case 'ArrowUp':
				if (keys.up) break;
				keys.up = true;
				socket.emit('keypress', 'up');
				break;
			case 'ArrowDown':
				if (keys.down) break;
				keys.down = true;
				socket.emit('keypress', 'down');
				break;
		}
	}

	/* Draw */

	const drawRoundedRect = (
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
		color: string
	): void => {
		if (!ctx) return;

		if (width < 2 * radius) radius = width / 2;
		if (height < 2 * radius) radius = height / 2;

		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.moveTo(x + radius, y);
		ctx.arcTo(x + width, y, x + width, y + height, radius);
		ctx.arcTo(x + width, y + height, x, y + height, radius);
		ctx.arcTo(x, y + height, x, y, radius);
		ctx.arcTo(x, y, x + width, y, radius);
		ctx.fill();
		ctx.closePath();
	}

	const drawPaddles = (
		paddles: Paddles,
	): void => {
		drawRoundedRect(
			paddles.left.x * ratio.x,
			paddles.left.y * ratio.y,
			paddles.left.width * ratio.x,
			paddles.left.height * ratio.y,
			6,
			paddles.left.color
		)

		drawRoundedRect(
			paddles.right.x * ratio.x,
			paddles.right.y * ratio.y,
			paddles.right.width * ratio.x,
			paddles.right.height * ratio.y,
			6,
			paddles.right.color
		)
	}

	const drawBall = (
		ball: Ball,
	): void => {
		if (!ctx) return;

		ctx.beginPath();
		ctx.arc(
			ball.x * ratio.x,
			ball.y * ratio.y,
			(ball.radius * ratio.x + ball.radius * ratio.y) / 2,
			0,
			Math.PI * 2
		);
		ctx.fillStyle = ball.color;
		ctx.closePath();
		ctx.fill();
	}

	const resizeCanvas = (): void => {
		if (!canvas.value) return;

		canvas.value.width = canvas.value.offsetWidth;
		canvas.value.height = canvas.value.clientHeight;

		ratio = {
			x: canvas.value.width / defaultGrid.width,
			y: canvas.value.height / defaultGrid.height,
		}
	}

	/* Socket handler */

	const update = (game: { paddles: Paddles, ball: Ball }): void => {
		if (!ctx || !canvas.value) return;
		
		ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
		
		drawPaddles(game.paddles);
		drawBall(game.ball);
		if (bonus.spawned) {
			ctx.drawImage(
				bonusImg,
				bonus.x * ratio.x,
				bonus.y * ratio.y,
				(bonus.w * ratio.x + bonus.h * ratio.y) / 2,
				(bonus.w * ratio.x + bonus.h * ratio.y) / 2,
			);
		}
	}

	const start = (data: { players: Players, width: number, height: number, startTime: number }): void => {
		listerners.push({ name: 'update', callback: update });
		socket.on('update', update);

		defaultGrid.height = data.height;
		defaultGrid.width = data.width;

		players.value = data.players;

		if (canvas.value) {
			ratio = {
				x: canvas.value.width / defaultGrid.width,
				y: canvas.value.height / defaultGrid.height
			}
		}

		endState.visible = false;
		if (!data.startTime) return;
		countdown.time = Math.floor((data.startTime - Date.now()) / 1000) + 1;
		countdown.visible = true;
		countdown.timer = setInterval(() => {
			countdown.time = Math.floor((data.startTime - Date.now()) / 1000) + 1;

			if (data.startTime - Date.now() <= 0) {
				countdown.visible = false;
				clearInterval(countdown.timer);
				return;
			}
		}, 100);
	}

	const updateScore = (data: { id: string, score: number }): void => {
		if (data.id === players.value.left.id) {
			players.value.left.score = data.score;
		} else {
			players.value.right.score = data.score;
		}
	}

	const	listerners: SocketEvent[] = [
		{ name: 'start', callback: start },
		{ name: 'score', callback: updateScore },
		{
			name: 'gameWinner',
			callback: (id: string) => {
				endState.visible = true;
				if (props.spectate) {
					endState.state = "spectate"
					if (id === players.value.left.id) endState.player = { color: "#0177FB", ...players.value.left };
					else endState.player = { color: "#FF4646", ...players.value.right };
				} else if (userStore?.me.id === id) endState.state = "win";
				else endState.state = "lose";

				if (ctx && canvas.value)
					ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
			}
		},
		{
			name: 'bonus_spawn',
			callback: (data: Bonus) => {
				bonusImg.src = data.imgURL;
				bonus = { ...data, spawned: true}
			}
		},
		{ name: 'bonus_despawn', callback: () =>  bonus.spawned = false },
		{ name: 'updateUser', callback: (data: UserConnected) => {
				const	player: Player = players.value.left.id === data.id ? players.value.left : players.value.right;
				player.username = userStore.me.username;
				player.level = userStore.me.level;
				player.experience = userStore.me.experience;
				player.next_level = userStore.me.next_level;
			}
		}
	]

	/* onMounted && onUnmounted */

	onMounted(() => {
		listerners.forEach(listener => socket.on(listener.name, listener.callback))

		if (!props.spectate) {
			window.addEventListener('keyup', handleKeyup, true);
			window.addEventListener('keydown', handleKeydown, true);
		}
		window.addEventListener("resize", resizeCanvas);

		if (canvas.value) {
			canvas.value.width = canvas.value.offsetWidth;
			canvas.value.height = canvas.value.clientHeight;

			ctx = canvas.value.getContext('2d');
		}
	});

	onUnmounted(() => {
		listerners.forEach(listener => socket.off(listener.name, listener.callback))

		if (!props.spectate) {
			window.removeEventListener('keydown', handleKeydown, true);
			window.removeEventListener('keyup', handleKeyup, true);
		}
		else
			socket.emit('leaveSpectateGame', { gameId: props.gameID });
		window.removeEventListener("resize", resizeCanvas);

		socket.emit('disconnect_game');

		if (countdown.timer) clearInterval(countdown.timer);
	});

	const handleClick = () => {
		if (props.spectate) {
			socket.emit('leaveSpectateGame', { gameId: props.gameID });
			props.close();
		}
	}
</script>

<template>
	<div class="game__content">
		<div class="game__header">			
			<VersusTag
				:player="players.left"
			/>
			<VersusTag
				:player="players.right"
				:reverse="true"
			/>
		</div>
		
		<div class="game__canvas_container">
			<div class="game__canvas_background"/>
			<div class="game__canvas_background"/>

			<canvas ref="canvas" class="game__canvas" />

			<div
				v-if="spectate && !endState.visible"
				class="game__canvas_leave">
				<button @click="handleClick"><span class="game__canvas_leave_btn">Leave spectate</span></button>
			</div>

			<Win
				v-if="endState.visible"
				:state="endState.state"
				:player="endState.player"
				:close="() => { endState.visible = false; close() }"
			/>

			<div
				v-if="countdown.visible"
				class="game__content_countdown"
			>
				<div class="game__content_countdown_content">
					<h1>{{ countdown.time }}</h1>
					<h2>countdown before the game starts</h2>
				</div>
			</div>
		</div>
	</div>
</template>