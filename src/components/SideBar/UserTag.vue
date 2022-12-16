<script setup lang="ts">

	import { toRefs, computed } from 'vue'
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

	const props = defineProps({
		section: {
			type: String,
			default: 'Invitees',
		},
		userName: {
			type: String,
			default: '',
		},
	})

	const	p = toRefs(props)

	const	options = computed(() => {
		if (p.section.value == 'onlySee')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB'
				}
			]
		else if (p.section.value == 'Invitees' || p.section.value == 'delete')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB'
				},
				{
					name: 'Delete',
					logo: logoTrash,
					color: '#E32F2F'
				}
			]
		else if (p.section.value == 'Add')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB'
				},
				{
					name: 'Add',
					logo: logoAdd,
					color: '#168F41'
				}
			]
		else if (p.section.value == 'allPrivileges')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB'
				},
				{
					name: 'Mute',
					logo: logoMute,
					color: '#FF8A00'
				},
				{
					name: 'Promote',
					logo: logoPromote,
					color: '#168F41'
				},
				{
					name: 'Ban',
					logo: logoStop,
					color: '#E32F2F'
				},
			]
		else if (p.section.value == 'allPrivilegesA')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB'
				},
				{
					name: 'Mute',
					logo: logoMute,
					color: '#FF8A00'
				},
				{
					name: 'Demote',
					logo: logoDemote,
					color: '#E32F2F'
				},
				{
					name: 'Ban',
					logo: logoStop,
					color: '#E32F2F'
				},
			]
	})

	const	emit = defineEmits(['add', 'delete'])

	const	manageOptions = (optionName: string) => {
		if (optionName == 'Add')
			emit('add', p.userName.value)
		else if (optionName == 'Delete')
			emit('delete')
	}

</script>

<template>

	<div class="UserTag">
		<div class="UserTag-infos">
			<img class="UserTag-avatar" src="../../assets/user.png" alt="user-avatar">
			<span class="UserTag-userNameWrap">
				<span class="UserTag-userName">{{ userName }}</span>
			</span>
		</div>
		<div class="UserTag-options">
			<OptionBtn
				v-for="(option, index) in options"
				:key="index"
				:logo="option.logo"
				:hoverColor="option.color"
				@click="manageOptions(option.name)"
			/>
		</div>
	</div>

</template>