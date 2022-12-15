<script setup lang="ts">

	import { toRefs, computed } from 'vue'
	import OptionBtn from './OptionBtn.vue'
	import {
		logoEye,
		logoTrash,
		logoAdd,
		logoMute,
		logoPromote,
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
		if (p.section.value == 'Invitees' || p.section.value == 'BannedA')
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
		else if (p.section.value == 'Banned' || p.section.value == 'Pending')
			return [
				{
					name: 'See',
					logo: logoEye,
					color: '#0177FB'
				}
			]
		else if (p.section.value == 'ChanUser')
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
				}
			]
		else if (p.section.value == 'ChanUserA')
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

	<div class="NewChanTag">
		<div class="NewChanTag-infos">
			<img class="NewChanTag-avatar" src="../../assets/user.png" alt="user-avatar">
			<span class="NewChanTag-userName">{{ userName }}</span>
		</div>
		<div class="NewChanTag-options">
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