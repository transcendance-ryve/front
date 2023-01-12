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

	export interface User {
		id: string,
		username: string,
		avatar: string
	}

	export interface Props {
		section: string
		user: User
	}

	export type emits = 'See' | 'Add' | 'Delete' | 'Mute' | 'Promote' | 'Demote' | 'Ban'

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

	const	emit = defineEmits(['See', 'Add', 'Delete', 'Mute', 'Promote', 'Demote', 'Ban'])

	const	manageOptions = (optionName: emits) => {
		// if (optionName == 'Add')
		// 	emit('add', p.user.value)
		// else if (optionName == 'Delete')
		// 	emit('delete')
		emit(optionName, p.user.value.id)
	}

	const	userStore = useUserStore()

	//	emit.promoteUser, { roleInfo: { userId, channelId } }
	//	on.promoteUserFailed
	//	on.userPromoted(id)

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