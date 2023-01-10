<script setup lang="ts">

	import { toRefs, computed } from 'vue'
	import type { user } from '@/components/SideBar/NewChanContent.vue'
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

	export interface User {
		id: string,
		username: string,
		avatar: string
	}

	export interface Props {
		section: string
		user: User
	}

	const props = withDefaults(defineProps<Props>(), {
		section: 'Invitees',
	})

	const	p = toRefs(props)

	const	options = computed(() => {
		if (p.section.value == 'onlySee')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				}
			]
		else if (p.section.value == 'Invitees' || p.section.value == 'delete')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				},
				{
					name: 'Delete',
					logo: logoTrash,
					color: '#E32F2F',
					toolTip: 'Delete'
				}
			]
		else if (p.section.value == 'Add')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				},
				{
					name: 'Add',
					logo: logoAdd,
					color: '#168F41',
					toolTip: 'Add user'
				}
			]
		else if (p.section.value == 'allPrivileges')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				},
				{
					name: 'Mute',
					logo: logoMute,
					color: '#FF8A00',
					toolTip: 'Mute'
				},
				{
					name: 'Promote',
					logo: logoPromote,
					color: '#168F41',
					toolTip: 'Promote'
				},
				{
					name: 'Ban',
					logo: logoStop,
					color: '#E32F2F',
					toolTip: 'Ban'
				},
			]
		else if (p.section.value == 'allPrivilegesA')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB',
					toolTip: 'View profile'
				},
				{
					name: 'Mute',
					logo: logoMute,
					color: '#FF8A00',
					toolTip: 'Mute'
				},
				{
					name: 'Demote',
					logo: logoDemote,
					color: '#E32F2F',
					toolTip: 'Demote'
				},
				{
					name: 'Ban',
					logo: logoStop,
					color: '#E32F2F',
					toolTip: 'Ban'
				},
			]
	})

	const	emit = defineEmits(['add', 'delete'])

	const	manageOptions = (optionName: string) => {
		if (optionName == 'Add')
			emit('add', p.user.value)
		else if (optionName == 'Delete')
			emit('delete')
	}

</script>

<template>

	<div class="UserTag">
		<div class="UserTag-infos">
			<img class="UserTag-avatar" :src="user.avatar" alt="user-avatar">
			<span class="UserTag-userNameWrap">
				<span class="UserTag-userName">{{ user.username }}</span>
			</span>
		</div>
		<div class="UserTag-options">
			<OptionBtn
				v-for="(option, index) in options"
				:key="index"
				:logo="option.logo"
				:hoverColor="option.color"
				:toolTip="option.toolTip"
				:shift="index == options.length - 1 ? true : false"
				@click="manageOptions(option.name)"
			/>
		</div>
	</div>

</template>