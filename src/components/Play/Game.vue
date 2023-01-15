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

	interface Props {
		spectate?: boolean,
	}

	const props: Props = defineProps<Props>();

	const players: Ref<Players> = ref({
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
		if (!canvas.value) return;
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

	const listeners: any = {
		start: start,
		update: update,
		score: updateScore
	}

	/* onMounted && onUnmounted */

	onMounted(() => {
		for (let name in listeners) {
			socket.on(name, listeners[name]);
		}

		if (!props.spectate) {
			window.addEventListener('keyup', handleKeyup, true);
			window.addEventListener('keydown', handleKeydown, true);
		}
	})

	onUnmounted(() => {
		for (let name in listeners) {
			socket.off(name, listeners[name]);
		}

		if (!props.spectate) {
			window.removeEventListener('keydown', handleKeydown, true);
			window.removeEventListener('keyup', handleKeyup, true);
		}
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