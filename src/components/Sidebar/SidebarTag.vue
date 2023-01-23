<script setup lang="ts">

	import { ref, reactive, type Ref, onMounted, onUnmounted, toRef } from 'vue'
	import { useSidebarStore } from '../../stores/SidebarStore'
	import { useUserStore } from '@/stores/UserStore'
	import { logoPlay, logoSend, logoAdd, logoJoin, logoAccept, logoRefuse, logoLock, logoPlayCircle } from '../../assets/logoSVG'
	import Status from './Status.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import Btn from '../Utils/Btn.vue'
	import type { ContentData } from '@/types/Sidebar'
	import type { User } from '@/types/User'
	import type { SocketEvent } from '@/types/Socket'
	import getPlayerGame from '@/requests/Sidebar/Games/getPlayerGame'
	import router from '@/router'

	export interface Props {
		data: Partial<ContentData>
	}

	const	props = defineProps<Props>()
	const	type: Ref<number> = ref(0)
	const	sbStore = useSidebarStore()
	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	password: Ref<string> = ref('')
	const 	gamemode = reactive({
		show: false,
		timer: 0,
	})
	const	timerPercent: Ref<string> = ref('')
	let		intervalID: number

	const	getType = () => {
		if (sbStore.state.section === 1)
			return sbStore.state.friendsState
		else if (sbStore.state.section === 2)
			return sbStore.state.channelsState
		else
			return sbStore.state.notifsState
	}

	const	addToFriend = () => {
		socket.emit('add_friend', { friendId: props.data.id })
	}

	const	notifAccept = (id: string) => {
		if (type.value === 1)
			socket.emit('accept_game_request', { matchmaking: false });
		else if (type.value === 2)
			socket.emit('accept_friend', { friendId: props.data.id })
		else if (type.value === 3)
			socket.emit('acceptInvitation', { invitationInfo: { channelId: props.data.id } })
	}

	const	notifRefuse = (id: string) => {
		if (type.value === 1)
			socket.emit('decline_game_request', { matchmaking: false });
		else if (type.value === 2)
			socket.emit('decline_friend', { friendId: props.data.id })
		else if (type.value === 3)
			socket.emit('declineInvitation', { invitationInfo: { channelId: props.data.id } })
	}

	const	joinChan = () => {
		if (props.data.status === 'PROTECTED' && !password.value)
			return
		else
			socket.emit('joinRoom', {
				joinInfo: {
					channelId: props.data.id,
					name: props.data.name,
					status: props.data.status,
					password: password.value
				}
			})
	}

	const inviteToParty = (bonus: boolean) => {
		gamemode.show = false;
		socket.emit('send_game_request', { opponent: props.data.id, bonus });
	}

	const showGamemode = () => {
		gamemode.show = true
		gamemode.timer = setTimeout(() => {
			gamemode.show = false
		}, 3000);
	}

	const	spectateRedirect = async () => {
		sbStore.spectate.gameId = await getPlayerGame(props.data.id!)
		router.push({ path: '/spectate', query: { order: 'desc' } })
	}

	const	listeners: SocketEvent[] = [
		{
			name: 'user_connected',
			callback: (user: Partial<User>) => {
				if (user.id === props.data.id)
					props.data.status = 'ONLINE'
			}
		},
		{
			name: 'user_disconnected',
			callback: (user: Partial<User>) => {
				if (user.id === props.data.id)
					props.data.status = 'OFFLINE'
			}
		},
		{
			name: 'user_in_game',
			callback: (user: Partial<User>) => {
				if (user.id === props.data.id)
					props.data.status = 'INGAME'
			}
		},
		{
			name: 'user_left_game',
			callback: (user: Partial<User>) => {
				if (user.id === props.data.id)
					props.data.status = 'ONLINE'
			}
		},
	]
	
	onMounted(() => {
		type.value = getType()
		if (sbStore.state.section === 3 && type.value === 1) {
			intervalID = setInterval(() => {
				const	timeLeft = props.data.timeup! - Date.now()
				timerPercent.value = `${timeLeft * 100 / 10000}%`
			}, 50)
		}
		listeners.forEach((listener) => {
			socket.on(listener.name, listener.callback)
		})
	})

	onUnmounted(() => {
		listeners.forEach((listener) => {
			socket.off(listener.name, listener.callback)
		})

		if (gamemode.timer)
			clearTimeout(gamemode.timer);
		if (intervalID)
			clearInterval(intervalID)
	})

</script>

<template>

	<div
		class="SidebarTag"
		:class="{countdown: sbStore.state.section === 3 && type === 1}"
	>
		<div class="SidebarTag-content">
			<img
				class="Content-avatar"
				:src="data.avatar"
				alt="user-avatar"
			>
			<div class="Content-infos">
				<div class="Infos-nameWrap">
					<span class="Infos-name">{{data.name || data.username}}</span>
					<Status :status="data.status"/>
					<Status v-if="data.usersCount" :users="data.usersCount"/>
				</div>
				<div v-if="(data.messages && data.messages[0]?.content)
					|| data.messages?.content"
					class="LastMsgWrap"
				>
					<span class="LastMsg">{{data.messages[0]?.content || data.messages.content}}</span>
				</div>
			</div>
		</div>

		<div class="SidebarTag-options" v-if="(sbStore.state.section === 1 && type === 1)">
			<Btn
				v-if="!gamemode.show"
				class="SidebarTag-btn"
				:type=1
				:value="data.status === 'INGAME' ? 'Spectate' : 'Invite to party'"
				:logo="data.status === 'INGAME' ? logoPlayCircle : logoPlay"
				width="185em"
				height="44em"
				@click.stop="data.status === 'INGAME' ? spectateRedirect() : showGamemode()"
			/>
			<Btn
				v-if="!gamemode.show"
				class="SidebarTag-btn"
				:type=2
				value="Send message"
				:logo="logoSend"
				width="185em"
				height="44em"
				@click.stop="sbStore.openConv('Friend', data.id)"
			/>
			<Btn
				v-if="gamemode.show"
				class="SidebarTag-btn"
				:type=1
				value="Classic"
				width="185em"
				height="44em"
				@click.stop="() => inviteToParty(false)"
			/>
			<Btn
				v-if="gamemode.show"
				class="SidebarTag-btn"
				:type=2
				value="Bonus"
				width="185em"
				height="44em"
				@click.stop="() => inviteToParty(true)"
			/>

		</div>
		<div
			class="SidebarTag-options"
			:class="{'SidebarTag-options--protected': data.status === 'PROTECTED'}"
			v-if="type === 2 && sbStore.state.section !== 3"
		>
			<Btn
				v-if="sbStore.state.section === 1"
				class="SidebarTag-btn"
				:type=1
				value="Add"
				:logo="logoAdd"
				width="386em"
				height="44em"
				@click.stop="addToFriend()"
			/>

			<BaseInput
				v-if="data.status === 'PROTECTED'"
				v-model="password"
				type="password"
				placeholder="Password"
				inputBackground="#272938"
				:logo="logoLock"
				logoSize="16em"
				inputHeight="40em"
				inputFont="500 14em 'Poppins'"
			/>

			<Btn
				v-if="sbStore.state.section === 2"
				class="SidebarTag-btn"
				:class="{'SidebarTag-btn--inactive': !password}"
				:type=1
				value="Join"
				:logo="logoJoin"
				width="386em"
				height="40em"
				@click="joinChan()"
			/>
		</div>

		<div v-if="sbStore.state.section === 3" class="SidebarTag-options">
			<Btn
				class="SidebarTag-btn"
				:type=1
				value="Accept"
				:logo="logoAccept"
				width="185em"
				height="44em"
				@click.stop="notifAccept(data.id || '')"
			/>
			<Btn
				class="SidebarTag-btn"
				:type=2
				value="Refuse"
				:logo="logoRefuse"
				:fillLogo="false"
				width="185em"
				height="44em"
				@click.stop="notifRefuse(data.id || '')"
			/>
		</div>
	</div>

</template>

<style>
	.SidebarTag.countdown::after {
		width: v-bind(timerPercent);
	}
</style>
