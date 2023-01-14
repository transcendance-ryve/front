<script setup lang="ts">

	import VersusTag from '@/components/Spectate/VersusTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import { ref, type Ref, onMounted, onUnmounted } from 'vue';

	interface Player {
		id: string,
		username: string,
		avatar: string,
		score: number,
		level: number,
		experience: number,
		next_level: number,
	}

	interface Players {
		left: Player,
		right: Player,
	}

	interface Grid {
		width: number,
		height: number,
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
	const canvas = ref(null);
	const listeners: any = [];

	let players: Ref<Players> = ref({
		left: {
			id: '',
			username: 'Player 1',
			avatar: 'http://localhost:3000/default.png',
			score: 0,
			level: 1,
			experience: 0,
			next_level: 100,
		},
		right: {
			id: '',
			username: 'Player 2',
			avatar: 'http://localhost:3000/default.png',
			score: 0,
			level: 1,
			experience: 0,
			next_level: 100,
		},
	})




	let defaultGrid: DefaultGrid = {
		width: 0,
		height: 0,
	};

	const keys: Keys = {
		w: false,
		s: false,
		up: false,
		down: false,
	}

	/* onMounted && onUnmounted */

	onMounted(() => {
		window.addEventListener('keyup', (e) => {
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
		})

		window.addEventListener('keydown', (e) => {
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
		})
	})

	onUnmounted(() => {
		listeners.forEach((listener: any) => socket.off(listener));
	})

	/* Draw */

	const drawRoundedRect = (
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number,
		color: string
	): void => {
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
		ctx: CanvasRenderingContext2D,
		paddles: Paddles,
		ratio: { x: number, y: number }
	): void => {
		drawRoundedRect(
			ctx,
			paddles.left.x * ratio.x,
			paddles.left.y * ratio.y,
			paddles.left.width * ratio.x,
			paddles.left.height * ratio.y,
			6,
			paddles.left.color
		)

		drawRoundedRect(
			ctx,
			paddles.right.x * ratio.x,
			paddles.right.y * ratio.y,
			paddles.right.width * ratio.x,
			paddles.right.height * ratio.y,
			6,
			paddles.right.color
		)
	}

	const drawBall = (
		ctx: CanvasRenderingContext2D,
		ball: Ball,
		ratio: { x: number, y: number }
	): void => {
		ctx.beginPath();
		ctx.arc(
			ball.x * ratio.x,
			ball.y * ratio.y,
			ball.radius * ratio.x,
			0,
			Math.PI * 2
		);
		ctx.fillStyle = ball.color;
		ctx.closePath();
		ctx.fill();
	}

	/* Socket handler */

	const update = (game: { paddles: Paddles, ball: Ball }): void => {
		// console.log(game);
		const ctx = canvas.value.getContext('2d');
		
		const ratio = {
			x: canvas.value.width / defaultGrid.width,
			y: canvas.value.height / defaultGrid.height,
		}

		canvas.value.width = canvas.value.offsetWidth;
		canvas.value.height = canvas.value.clientHeight;

		drawPaddles(ctx, game.paddles, ratio);
		drawBall(ctx, game.ball, ratio);
	}

	const start = (data: { players: Players, width: number, height: number }): void => {
		defaultGrid.height = data.height;
		defaultGrid.width = data.width;

		players.value = data.players;
	}

	const updateScore = (data: { id: string, score: number }): void => {
		if (data.id === players.value.left.id) {
			players.value.left.score = data.score;
		} else {
			players.value.right.score = data.score;
		}
	}
	// const playerJoin = (): void => {}
	// const bonusSpawn = (): void => {}
	// const bonusTaken = (): void => {}

	/* Socket listeners */

	const	emit = defineEmits(['end'])

	onMounted(() => {
		listeners.push(socket.on("start", (data: { players: Players, width: number, height: number }) => { start(data) }));
		listeners.push(socket.on("update", (game: { paddles: Paddles, ball: Ball }) => { update(game) }));
		listeners.push(socket.on("score", (data: { id: string, score: number }) => { updateScore(data) }));
		// listeners.push(socket.on("bonus_spawn", (data: any) => bonusSpawn() ))
		// listeners.push(socket.on("bonus_taken", (data: any) => bonusTaken() ))

		listeners.push(socket.on('gameWin', (id: string) => {
			emit('end', id);
		}))
		listeners.push(socket.on('gameLoose', (id: string) => {
			emit('end', id);
		}))
	})

	onUnmounted(() => {
		listeners.forEach((listener: any) => socket.off(listener));
	})

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
			<canvas ref="canvas" class="game__canvas" />
		</div>
	</div>
</template>