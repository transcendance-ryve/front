<script setup lang="ts">

	import { ref } from 'vue'
	import UserTag from './UserTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import type { Target, TargetTag } from '@/types/User'
	import { logoListArrow } from '../../assets/logoSVG'
	import { profileRedirect } from '@/router/index'

	export interface Props {
		channelId: string
		label: string
		users: TargetTag[]
		owner?: boolean
		admin?: boolean
		open?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		owner: false,
		admin: false,
		open: false
	})

	const	open = ref(props.open)
	const	closed = ref(false)

	const	userTagType = () => {
		if (props.label === 'Banned') {
			if (props.admin || props.owner)
				return 'banned'
			else
				return 'onlySee'
		}
		else if (props.label === 'Administrators' && props.owner)
			return 'allPrivilegesA'
		else if (props.label === 'Users' && (props.admin || props.owner))
			return 'allPrivileges'
		else if ((props.admin && !props.owner) && props.label === 'Administrators')
			return 'noPrivileges'
		else if ((!props.admin && !props.owner) && (props.label === 'Administrators' || props.label === 'Users'))
			return 'noPrivileges'
		else
			return 'onlySee'
	}

	const	updateState = () => {
		open.value = !open.value
		closed.value = !open.value
	}

	const	userStore = useUserStore()
	const	socket = userStore.socket

	const	promoteUser = (user: TargetTag) => {
		socket.emit('promoteUser', { roleInfo: { userId: user.id, channelId: props.channelId } })
	}

	const	demoteUser = (user: TargetTag) => {
		socket.emit('demoteUser', { roleInfo: { userId: user.id, channelId: props.channelId } })
	}

	const	muteUser = (user: TargetTag) => {
		socket.emit('muteUser', { muteInfo: { channelId: props.channelId, targetId: user.id, action: 'MUTE' } })
	}

	const	demuteUser = (user: TargetTag) => {
		socket.emit('unmuteUser', { muteInfo: { channelId: props.channelId, targetId: user.id, action: 'MUTE' } })
	}

	const	banUser = (user: TargetTag) => {
		socket.emit('banUser', { banInfo: { channelId: props.channelId, targetId: user.id, action: 'BAN' } })
	}

	const	debanUser = (user: TargetTag) => {
		socket.emit('unbanUser', { banInfo: { channelId: props.channelId, targetId: user.id, action: 'BAN' } })
	}

	const	blockUser = (user: TargetTag) => {
		socket.emit('block_user', { blockedId: user.id })
	}

	const	unblockUser = (user: TargetTag) => {
		socket.emit('unblock_user', { blockedId: user.id })
	}

	const	inviteToParty = (id: string, bonus: boolean) => {
		
		socket.emit('send_game_request', { opponent: id, bonus })
	}

</script>

<template>

	<div class="DropDownListWrap" :class="{'DropDownListWrap--open': open, 'DropDownListWrap--closed': closed}">
		<label
			class="DropDownLabel"
			
			@click="updateState"
		>
			<span class="DropDownLabel-value">{{ label }}</span>
			<span class="DropDownLabel-arrow" v-html="logoListArrow"></span>
		</label>
		<div class="DropDownList" v-if="open">
			<UserTag
				class="DropDownList-Tag"
				v-for="(user, index) in users"
				:key="index"
				:section="userTagType()"
				:user="user"
				@promote="promoteUser"
				@demote="demoteUser"
				@mute="muteUser"
				@unmute="demuteUser"
				@ban="banUser"
				@unban="debanUser"
				@block="blockUser"
				@unblock="unblockUser"
				@see="(user) => profileRedirect(user.id)"
				@inviteToParty="inviteToParty"
			/>
		</div>
	</div>

</template>
