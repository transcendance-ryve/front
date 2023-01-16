<script setup lang="ts">

	import { computed, ref, type Ref, onMounted, onUnmounted } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import { useUserStore } from '@/stores/UserStore'
	import { logoPlay, logoSend, logoAdd, logoJoin, logoAccept, logoRefuse, logoLock } from '../../assets/logoSVG'
	import Status from './Status.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import Btn from '../Utils/Btn.vue'
	import type { ContentData } from '@/types/Sidebar'
	import type { User } from '@/types/User'
	import type { SocketEvent } from '@/types/Socket'

	export interface Props {
		type: number
		data: Partial<ContentData>
	}

	const	props = defineProps<Props>()
	const	sbStore = useSideBarStore()
	const	userStore = useUserStore()
	const	socket = userStore.socket
	const	password: Ref<string> = ref('')

	const	addToFriend = (id: string) => {
		socket.emit('add_friend', { friendId: props.data.id })
	}

	const	notifAccept = (id: string) => {
		if (props.type === 2)
			socket.emit('accept_friend', { friendId: props.data.id })
		else if (props.type === 3)
			socket.emit('acceptInvitation', { invitationInfo: { channelId: props.data.id } })
	}

	const	notifRefuse = (id: string) => {
		if (props.type === 2)
			socket.emit('decline_friend', { friendId: props.data.id })
		else if (props.type === 3)
			socket.emit('declineInvitation', { invitationInfo: { channelId: props.data.id } })
	}

	const	joinChan = () => {
		if (!password.value)
			return
		if (props.data.status === 'PROTECTED' && !password.value)
			alert('Empty password')
		else
			socket.emit('joinRoom', {
				joinInfo: {
					channelId: props.data.id,
					name: props.data.name,
					status: props.data.status,
					password: password
				}
			})
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
		}
	]
	
	onMounted(() => {
		listeners.forEach((listener) => {
			socket.on(listener.name, listener.callback)
		})
	})

	onUnmounted(() => {
		listeners.forEach((listener) => {
			socket.off(listener.name, listener.callback)
		})
	})

</script>

<template>

	<div class="SideBarTag" >
		<div class="SideBarTag-content">
			<img
				class="Content-avatar"
				:src="data.avatar"
				alt="user-avatar"
			>
			<div class="Content-infosWrap">
				<div class="Content-infos">
					<div class="Infos-nameWrap">
						<span class="Infos-name">{{data.name || data.username}}</span>
						<Status :status="data.status"/>
					</div>
					<Status v-if="data.usersCount" :users="data.usersCount"/>
				</div>
				<div v-if="data.messages?.length" class="LastMsgWrap">
					<span class="LastMsg">{{data.messages[0].content}}</span>
				</div>
			</div>
		</div>

		<div class="SideBarTag-options" v-if="(sbStore.state.section == 1 && type == 1)">
			<Btn
				class="SideBarTag-btn"
				:type=1 value="Invite to party"
				:logo="logoPlay"
				width="185em"
				height="44em"
			/>
			<Btn
				class="SideBarTag-btn"
				:type=2
				value="Send message"
				:logo="logoSend"
				width="185em"
				height="44em"
				@click.stop="sbStore.openConv('Friend', data.id)"
			/>
		</div>

		<div
			class="SideBarTag-options"
			:class="{'SideBarTag-options--protected': data.status == 'PROTECTED'}"
			v-if="type == 2 && sbStore.state.section != 3"
		>
			<Btn
				v-if="sbStore.state.section == 1"
				class="SideBarTag-btn"
				:type=1
				value="Add"
				:logo="logoAdd"
				width="386em"
				height="44em"
				@click.stop="addToFriend(data.id || '')"
			/>

			<BaseInput
				v-if="data.status == 'PROTECTED'"
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
				v-if="sbStore.state.section == 2"
				class="SideBarTag-btn"
				:class="{'SideBarTag-btn--inactive': !password}"
				:type=1
				value="Join"
				:logo="logoJoin"
				width="386em"
				height="40em"
				@click="joinChan()"
			/>
		</div>

		<div v-if="sbStore.state.section == 3" class="SideBarTag-options">
			<Btn
				class="SideBarTag-btn"
				:type=1
				value="Accept"
				:logo="logoAccept"
				width="185em"
				height="44em"
				@click.stop="notifAccept(data.id || '')"
			/>
			<Btn
				class="SideBarTag-btn"
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
