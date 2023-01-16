<script setup lang="ts">

	import { computed } from 'vue'
	import { useUserStore } from '@/stores/UserStore'
	import ActionBtn, { type ActionBtnValue } from './ActionBtn.vue'
	import {
		logoEye,
		logoTrash,
		logoAdd,
		logoMute,
		logoPromote,
		logoDemote,
		logoStop
	} from '../../assets/logoSVG'
	import type { TargetTag } from '@/types/User'

	export interface Props {
		section: string
		user: TargetTag
	}

	const props = withDefaults(defineProps<Props>(), {
		section: 'Invitees',
	})

	const actionBtns: ActionBtnValue[] = [
		{
			name: 'see',
			logo: logoEye,
			color: '#0177FB',
			toolTip: 'View profile'
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
			name: 'demute',
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
			name: 'deban',
			logo: logoStop,
			color: '#E32F2F',
			toolTip: 'Deban',
		}
	]

	const	options = computed(() => {
		if (props.section == 'onlySee' || userStore.me.id === props.user.id)
			return [actionBtns[0]]
		else if (props.section == 'Invitees')
			return [actionBtns[0], actionBtns[1]]
		else if (props.section == 'Add')
			return [actionBtns[0], actionBtns[2]]
		else if (props.section == 'allPrivileges')
			return [actionBtns[0], props.user.isMute ? actionBtns[3] : actionBtns[4], actionBtns[5], actionBtns[7]]
		else if (props.section == 'allPrivilegesA')
			return [actionBtns[0], actionBtns[6]]
		else if (props.section == 'banned')
			return [actionBtns[0], actionBtns[8]]
		else
			return []
	})

	const	userStore = useUserStore()

</script>

<template>

	<div class="UserTag" :class="{'UserTag--me': user.id === userStore.me.id}">
		<div class="UserTag-infos">
			<img class="UserTag-avatar" :src="user.avatar" alt="user-avatar">
			<span class="UserTag-userNameWrap">
				<span class="UserTag-userName">{{ user.username }}</span>
			</span>
		</div>
		<div class="UserTag-options">
			<ActionBtn
				v-for="(option, index) in options"
				:class="{
					'ActionBtn--mute': option.name === 'demute',
					'ActionBtn--ban': option.name === 'deban'
					}"
				:key="index"
				:logo="option.logo"
				:hoverColor="option.color"
				:toolTip="option.toolTip"
				:shift="index === options.length - 1 ? true : false"
				@click="$emit(option.name, user)"
			/>
		</div>
	</div>

</template>