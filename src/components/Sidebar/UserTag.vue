<script setup lang="ts">

	import { computed, ref, type Ref, onUnmounted } from 'vue'
	import { useUserStore } from '@/stores/UserStore'
	import Tooltip from '../Utils/Tooltip.vue'
	import ActionBtn, { type ActionBtnValue } from './ActionBtn.vue'
	import { profileRedirect } from '@/router'
	import {
		logoPlay,
		logoTrash,
		logoAdd,
		logoMute,
		logoPromote,
		logoDemote,
		logoStop,
		logoBlockMsg
	} from '../../assets/logoSVG'
	import type { TargetTag } from '@/types/User'

	export interface Props {
		section: string
		user: TargetTag
	}

	const props = withDefaults(defineProps<Props>(), {
		section: 'Invitees',
	})

	const	userStore = useUserStore()

	const actionBtns: ActionBtnValue[] = [
		{
			name: 'play',
			logo: logoPlay,
			color: '#0177FB',
			toolTip: 'Invite to play'
		},
		{
			name: 'delete',
			logo: logoTrash,
			color: '#E32F2F',
			toolTip: 'Delete'
		},
		{
			name: 'add',
			logo: logoAdd,
			color: '#168F41',
			toolTip: 'Add user'
		},
		{
			name: 'unmute',
			logo: logoMute,
			color: '#FF8A00',
			toolTip: 'Demute'
		},
		{
			name: 'mute',
			logo: logoMute,
			color: '#FF8A00',
			toolTip: 'Mute'
		},
		{
			name: 'promote',
			logo: logoPromote,
			color: '#168F41',
			toolTip: 'Promote'
		},
		{
			name: 'demote',
			logo: logoDemote,
			color: '#E32F2F',
			toolTip: 'Demote'
		},
		{
			name: 'ban',
			logo: logoStop,
			color: '#E32F2F',
			toolTip: 'Ban'
		},
		{
			name: 'unban',
			logo: logoStop,
			color: '#E32F2F',
			toolTip: 'Unban',
		},
		{
			name: 'block',
			logo: logoBlockMsg,
			color: '#FF8A00',
			toolTip: 'Block',
		},
		{
			name: 'unblock',
			logo: logoBlockMsg,
			color: '#FF8A00',
			toolTip: 'Unblock',
		}
	]

	const	options = computed(() => {
		if (props.section === 'onlySee' || userStore.me.id === props.user.id)
			return []
		else if (props.section === 'noPrivileges')
			return [actionBtns[0], props.user.isBlocked ? actionBtns[10] : actionBtns[9]]
		else if (props.section === 'Invitees')
			return [actionBtns[1]]
		else if (props.section === 'Add')
			return [actionBtns[2]]
		else if (props.section === 'allPrivileges')
			return [actionBtns[0], actionBtns[5], props.user.isMute ? actionBtns[3] : actionBtns[4], props.user.isBlocked ? actionBtns[10] : actionBtns[9], actionBtns[7]]
		else if (props.section === 'allPrivilegesA')
			return [actionBtns[0], actionBtns[6], props.user.isBlocked ? actionBtns[10] : actionBtns[9]]
		else if (props.section === 'banned')
			return [actionBtns[8]]
		else
			return []
	})

	const	optionsLength = computed(() => options.value.length)

	const	gameOptions: Ref<boolean> = ref(false)
	let		timerID: number = 0

	const	handleGameRequest = () => {
		gameOptions.value = true
		timerID = setTimeout(() => {
			gameOptions.value = false
		}, 5000)
	}

	onUnmounted(() => {
		if (timerID)
			clearTimeout(timerID)
	})

</script>

<template>

	<div class="UserTag" :class="{'UserTag--me': user.id === useUserStore().me.id}">
		<div class="UserTag-infos">
			<img class="UserTag-avatar" :src="user.avatar" alt="user-avatar">
			<span class="UserTag-userNameWrap" :class="{'UserNameWrap--min': gameOptions}" @click="profileRedirect(user.id)">
				<span class="UserTag-userName">
					{{ user.username }}
				</span>
				<Tooltip value="View profile" />
			</span>
		</div>
		<div class="UserTag-options">
			<ActionBtn
				v-for="(option, index) in options"
				:class="{
					'ActionBtn--mute': option.name === 'unmute',
					'ActionBtn--ban': option.name === 'unban',
					'ActionBtn--block': option.name === 'unblock',
					'ActionBtn--game': option.name === 'play' && gameOptions
				}"
				:key="index"
				:logo="option.logo"
				:hoverColor="option.color"
				:toolTip="option.toolTip"
				:shift="index === options.length - 1 ? true : false"
				:gameRequest="option.name === 'play' && gameOptions"
				@click="option.name === 'play' ? handleGameRequest() : $emit(option.name, user)"
				@classic="$emit('inviteToParty', user.id, false)"
				@bonus="$emit('inviteToParty', user.id, true)"
			/>
		</div>
	</div>

</template>

<style lang="scss" scoped>

	.UserTag-userNameWrap {
		max-width: calc(338em - (32em * v-bind(optionsLength) + 16em * (v-bind(optionsLength))));
	}

</style>