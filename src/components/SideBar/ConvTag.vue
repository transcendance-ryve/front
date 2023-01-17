<script setup lang="ts">

	import { computed, ref, type Ref, toRefs, type ToRefs, watch } from 'vue'
	import Status from './Status.vue'
	import moment from 'moment'
	import ActionBtn, { type ActionBtnValue } from './ActionBtn.vue'
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
	import type { Target } from '@/types/User'

	export interface Props {
		type: string
		target: Target
		admin: boolean
		userList: boolean
	}

	const props = defineProps<Props>()

	const actionBtns: ActionBtnValue[] = [
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

	const { type, target, admin, userList }: ToRefs<Readonly<Props>> = toRefs(props)
	const	btns = computed(() => {
		if (type.value === 'Friend') {
			if (target.value.status === 'In Game')
				return [{ name: 'Spectate', logo: logoPlayCircle }, { name: 'See', logo: logoEye, }]
			else
				return [{ name: 'See', logo: logoEye }]
		}
		else
			return [{ name: 'Quit', logo: logoQuit }, {
				name: userList.value === true ? 'Conversation' : admin.value ? 'Settings' : 'Members',
				logo: userList.value === true ? logoMsg :  admin.value ? logoSettings : logoPeople,
			}]
	})

	const	emit = defineEmits(['see', 'userList', 'conv', 'settings', 'quit', 'block', 'delete'])

	const	manageOptions = (optionName: string) => {
		if (optionName === 'Members')
			emit('userList')
		else if (optionName === 'See')
			emit('see')
		else if (optionName === 'Settings') {
			emit('settings')
		}
		else if (optionName === 'Conversation')
			emit('conv')
		else if (optionName === 'Quit')
			emit('quit')
		else if (optionName === 'Block')
			emit('block')
		else if (optionName === 'Delete')
			emit('delete')
	}

	const	name = props.target.name ? props.target.name : props.target.username

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
						<ActionBtn
							v-for="(option, index) in actionBtns"
							:key="index"
							:logo="option.logo"
							:hoverColor="option.color"
							:toolTip="option.toolTip"
							@click="manageOptions(option.name)"
						/>
					</div>
					<span class="Infos-CreateDate" v-else>{{ 'Created ' + moment(target.createdAt).format('ll') }}</span>
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
