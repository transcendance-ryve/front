<script setup lang="ts">

	import { toRefs, computed } from 'vue'
	import { useUserStore } from '@/stores/UserStore'
	import OptionBtn from './OptionBtn.vue'
	import {
		logoEye,
		logoTrash,
		logoAdd,
		logoMute,
		logoPromote,
		logoDemote,
		logoStop
	} from '../../assets/logoSVG'

	export interface IUserTag {
		id: string,
		username: string,
		avatar: string,
		role: string,
		isMute: boolean,
		isBan: boolean,
	}

	export interface Props {
		section: string
		user: IUserTag
	}

	const props = withDefaults(defineProps<Props>(), {
		section: 'Invitees',
	})

	const	p = toRefs(props)

	const	options = computed(() => {
		if (p.section.value == 'onlySee' || userStore.me.id === p.user.value.id)
			return [
				{
					name: 'see',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				}
			]
		else if (p.section.value == 'Invitees')
			return [
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
				}
			]
		else if (p.section.value == 'Add')
			return [
				{
					name: 'see',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				},
				{
					name: 'add',
					logo: logoAdd,
					color: '#168F41',
					toolTip: 'Add user'
				}
			]
		else if (p.section.value == 'allPrivileges')
			return [
				{
					name: 'see',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				},
				{
					name: p.user.value.isMute ? 'demute' : 'mute',
					logo: logoMute,
					color: '#FF8A00',
					toolTip: p.user.value.isMute ? 'Demute' : 'Mute'
				},
				{
					name: 'promote',
					logo: logoPromote,
					color: '#168F41',
					toolTip: 'Promote'
				},
				{
					name: 'ban',
					logo: logoStop,
					color: '#E32F2F',
					toolTip: 'Ban',
				},
			]
		else if (p.section.value == 'allPrivilegesA')
			return [
				{
					name: 'see',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				},
				{
					name: 'demote',
					logo: logoDemote,
					color: '#E32F2F',
					toolTip: 'Demote'
				},
			]
		else if (p.section.value == 'banned')
				return [
					{
						name: 'see',
						logo: logoEye,
						color: '#0177FB',
						toolTip: 'View profile'
					},
					{
						name: 'deban',
						logo: logoStop,
						color: '#E32F2F',
						toolTip: 'Deban',
					}
				]
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
			<OptionBtn
				v-for="(option, index) in options"
				:class="{
					'OptionBtn--mute': option.name === 'demute',
					'OptionBtn--ban': option.name === 'deban'
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