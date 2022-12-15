<script setup lang="ts">

	import { computed, ref, toRefs } from 'vue'
	import Status from './Status.vue'
	import OptionBtn from './OptionBtn.vue'
	import {
		logoEye,
		logoMute,
		logoTrash,
		logoPlayCircle,
		logoQuit,
		logoPeople,
		logoMsg
	} from '../../assets/logoSVG'

	const props = defineProps({
		type : {
			type: String,
			default: ''
		},
		name: {
			type: String,
		},
		status: {
			type: String,
			default: ''
		}
	})

	const	options = [
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
			name: 'Delete',
			logo: logoTrash,
			color: '#E32F2F'
		}
	]

	const	userList = ref(false)

	const	p = toRefs(props)
	const	btns = computed(() => {
		if (p.type.value == 'Friend') {
			if (p.status.value == 'In Game')
				return [
					{
						name: 'Spectate',
						logo: logoPlayCircle,
					},
					{
						name: 'See',
						logo: logoEye,
					}
				]
			else
				return [
					{
						name: 'See',
						logo: logoEye,
					},
				]
		}
		else
			return [
				{
					name: 'Quit',
					logo: logoQuit,
				},
				{
					name: userList.value == true ? 'Conversation' : 'Members',
					logo: userList.value == true ? logoMsg : logoPeople,
				}
			]
	})

	const	emit = defineEmits(['userList', 'conv'])

	const	manageOptions = (optionName: string) => {
		if (optionName == 'Members') {
			userList.value = true
			emit('userList')
		}
		else if (optionName == 'Conversation') {
			userList.value = false
			emit('conv')
		}
	}

</script>

<template>

	<div class="ConvTag">
		<div class="ConvTag-content">
			<div class="ConvTag-infos">
				<img class="Infos-avatar" src="../../assets/user.png" alt="avatar">
				<div class="Infos-content">
					<div class="Infos-nameWrap">
						<span class="Infos-name">{{ name }}</span>
						<Status :status="status"/>
					</div>
					<div class="Infos-options" v-if="type == 'Friend'">
						<OptionBtn
							v-for="(option, index) in options"
							:key="index"
							:logo="option.logo"
							:hoverColor="option.color"
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
