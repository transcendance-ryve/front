<script setup lang="ts">

	import { computed, ref, toRefs } from 'vue'
	import Status from './Status.vue'
	import OptionBtn from './OptionBtn.vue'
	import {
		logoEye,
		logoStop,
		logoTrash,
		logoPlayCircle,
		logoQuit,
		logoPeople,
		logoMsg,
		logoSettings
	} from '../../assets/logoSVG'
	import type { Target } from '@/components/SideBar/SideBarConv.vue'

	export interface Props {
		type: string
		target: Target
		admin: boolean
	}

	const props = defineProps<Props>()

	const	options = [
		{
			name: 'See',
			logo: logoEye,
			color: '#0177FB',
			toolTip: 'View profile'

		},
		{
			name: 'Block',
			logo: logoStop,
			color: '#FF8A00',
			toolTip: 'Block'
		},
		{
			name: 'Delete',
			logo: logoTrash,
			color: '#E32F2F',
			toolTip: 'Delete'
		}
	]

	const	userList = ref(false)

	const	p = toRefs(props)

	const	btns = computed(() => {
		if (p.type.value == 'Friend') {
			if (p.target.value.status === 'In Game')
				return [{ name: 'Spectate', logo: logoPlayCircle }, { name: 'See', logo: logoEye, }]
			else
				return [{ name: 'See', logo: logoEye }]
		}
		else
			return [{ name: 'Quit', logo: logoQuit }, {
				name: userList.value === true ? 'Conversation' : p.admin.value ? 'Settings' : 'Members',
				logo: userList.value === true ? logoMsg :  p.admin.value ? logoSettings : logoPeople,
			}]
	})

	const	emit = defineEmits(['userList', 'conv', 'settings', 'quit'])

	const	manageOptions = (optionName: string) => {
		if (optionName === 'Members') {
			userList.value = true
			emit('userList')
		}
		else if (optionName === 'Settings') {
			emit('settings')
		}
		else if (optionName === 'Conversation') {
			userList.value = false
			emit('conv')
		}
		else if (optionName === 'Quit')
			emit('quit')
	}

	const	name = p.target.value.name ? p.target.value.name : p.target.value.username

</script>

<template>

	<div class="ConvTag">
		<div class="ConvTag-content">
			<div class="ConvTag-infos">
				<img class="Infos-avatar" :src="target.avatar" alt="avatar">
				<div class="Infos-content">
					<div class="Infos-nameWrap">
						<span class="Infos-name">{{ name }}</span>
						<Status :status="target.status"/>
					</div>
					<div class="Infos-options" v-if="type == 'Friend'">
						<OptionBtn
							v-for="(option, index) in options"
							:key="index"
							:logo="option.logo"
							:hoverColor="option.color"
							:toolTip="option.toolTip"
							@click="$emit(option.name)"
						/>
					</div>
					<span class="Infos-CreateDate" v-else>Created 23 July 2015</span>
				</div>
			</div>
			<div class="ConvTag-BtnsWrap">
				<button
					v-for="(btn, index) in btns"
					:key="index"
					class="ConvTag-Btns"
					:class="{'ConvTag-Btns--smallLogo': btn.name == 'Conversation' || btn.name == 'Quit'}"
					@click="manageOptions(btn.name)"
				>
					<span class="ConvTag-Btns-logo" v-html="btn.logo"></span>
				</button>
			</div>
		</div>
	</div>

</template>
