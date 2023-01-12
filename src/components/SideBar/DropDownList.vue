<script setup lang="ts">

	import { ref, toRefs } from 'vue'
	import UserTag from './UserTag.vue'
	import { useUserStore } from '@/stores/UserStore'
	import type { IUserTag } from './UserTag.vue'
	import { logoListArrow } from '../../assets/logoSVG'

	export interface Props {
		channelId: string
		label: string
		users: IUserTag[]
		owner?: boolean
		admin?: boolean
		open?: boolean
	}

	const props = withDefaults(defineProps<Props>(), {
		owner: false,
		admin: false,
		open: false
	})

	const	p = toRefs(props)

	const	open = ref(p.open.value)
	const	closed = ref(false)

	const	userTagType = () => {
		if (p.label.value == 'Banned' && (p.admin.value || p.owner.value))
			return 'delete'
		else if (p.label.value == 'Administrators' && p.owner.value)
			return 'allPrivilegesA'
		else if (p.label.value == 'Users' && (p.admin.value || p.owner.value))
			return 'allPrivileges'
		else
			return 'onlySee'
	}

	const	updateState = () => {
		open.value = !open.value
		closed.value = !open.value
	}

	const	userStore = useUserStore()
	const	socket = userStore.socket

	const	promoteUser = (user: IUserTag) => {
		socket.emit('promoteUser', { roleInfo: { userId: user.id, channelId: p.channelId.value } })
	}

	const	demoteUser = (user: IUserTag) => {
		socket.emit('demoteUser', { roleInfo: { userId: user.id, channelId: p.channelId.value } })
	}

	const	muteUser = (user: IUserTag) => {
		socket.emit('muteUser', { muteInfo: { channelId: p.channelId.value, targetId: user.id, action: 'MUTE' } })
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
			/>
		</div>
	</div>

</template>
