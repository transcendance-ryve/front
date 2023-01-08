<script setup lang="ts">

	import { toRefs, computed } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import { logoPlay, logoSend, logoAdd, logoJoin, logoAccept, logoRefuse, logoLock } from '../../assets/logoSVG'
	import Status from './Status.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import Btn1 from '../Utils/Btn1.vue'
	import type { contentData } from '@/components/SideBar/SideBarContent.vue'
	import router from '@/router'
	import sendFriendRequest from '@/requests/Friends/sendFriendRequest'
	import acceptFriendRequest from '@/requests/Friends/acceptFriendRequest'

	export interface Props {
		type: number
		data: Partial<contentData>
	}

	const props = defineProps<Props>()

	const p = toRefs(props);

	const	statusClass = computed(() => {
		if (p.data.value.status == 'In Game')
			return 'Status--inGame'
		else
			return 'Status--' + p.data.value.status
	})

	const	sbStore = useSideBarStore()

	const	addToFriend = (id: string) => {
		sbStore.hiddenTags.push(id)
		sendFriendRequest(id.toString())
	}

	const	notifAccept = (id: string) => {
		if (p.type.value === 2) {
			acceptFriendRequest(id)
			sbStore.hiddenTags.push(id)
		}
	}

</script>

<template>

	<div class="SideBarTag" v-if="!sbStore.hiddenTags.includes(data.id || '')" >
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
					<Status v-if="data.users" :users="data.users"/>
				</div>
				<!-- <div v-if="data.lastMsg" class="LastMsgWrap"> -->
					<div v-if="data.lastMsg || (sbStore.state.section === 1 && sbStore.state.friendsState === 1)" class="LastMsgWrap">	//	a suppr
					<!-- <span class="LastMsg">{{data.lastMsg}}</span> -->
					<span class="LastMsg">{{data.lastMsg || 'sds cndoew lopa cbwqed adod eai'}}</span>	//	a suppr
				</div>
			</div>
		</div>

		<div class="SideBarTag-options" v-if="(sbStore.state.section == 1 && type == 1)">
			<Btn1
				class="SideBarTag-btn"
				:type=1 value="Invite to party"
				:logo="logoPlay"
				width="185em"
				height="44em"
			/>
			<Btn1
				class="SideBarTag-btn"
				:type=2
				value="Send message"
				:logo="logoSend"
				width="185em"
				height="44em"
				@click.stop="sbStore.openConv('Friend', data.name, data.status)"
			/>
		</div>

		<div
			class="SideBarTag-options"
			:class="{'SideBarTag-options--protected': data.status == 'PROTECTED'}"
			v-if="type == 2 && sbStore.state.section != 3"
		>
			<Btn1
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
				type="password"
				placeholder="Password"
				inputBackground="#272938"
				:logo="logoLock"
				logoSize="16em"
				inputHeight="40em"
				inputFont="500 14em 'Poppins'"
			/>

			<Btn1
				v-if="sbStore.state.section == 2"
				class="SideBarTag-btn"
				:type=1
				value="Join"
				:logo="logoJoin"
				width="386em"
				height="40em"
			/>
		</div>

		<div v-if="sbStore.state.section == 3" class="SideBarTag-options">
			<Btn1
				class="SideBarTag-btn"
				:type=1 value="Accept"
				:logo="logoAccept"
				width="185em"
				height="44em"
				@click.stop="notifAccept(data.id || '')"
			/>
			<Btn1
				class="SideBarTag-btn"
				:type=2
				value="Refuse"
				:logo="logoRefuse"
				:fillLogo="false"
				width="185em"
				height="44em"
			/>
		</div>
	</div>

</template>
