<script setup lang="ts">

	import { computed, toRefs, type ToRefs, watch } from 'vue'
	import Status from './Status.vue'
	import moment from 'moment'
	import ActionBtn, { type ActionBtnValue } from './ActionBtn.vue'
	import {
		logoEye,
		logoBlockMsg,
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
		friendBlocked: boolean
	}

	const props = defineProps<Props>()
	const { type, target, admin, userList, friendBlocked }: ToRefs<Readonly<Props>> = toRefs(props)

	const actionBtns: ActionBtnValue[] = [
		{
			name: 'see',
			logo: logoEye,
			color: '#0177FB',
			toolTip: 'View profile'

		},
		{
			name: friendBlocked.value ? 'unblock' : 'block',
			logo: logoBlockMsg,
			color: '#FF8A00',
			toolTip: friendBlocked.value ? 'Unblock' : 'Block'
		},
		{
			name: 'delete',
			logo: logoTrash,
			color: '#E32F2F',
			toolTip: 'Delete'
		}
	]

	watch(friendBlocked, (newVal) => {
		actionBtns[1].name = newVal ? 'unblock' : 'block'
		actionBtns[1].toolTip = newVal ? 'Unblock' : 'Block'
	})

	const	btns = computed(() => {
		if (type.value === 'Friend') {
			if (target.value.status === 'INGAME')
				return [{ name: 'spectate', logo: logoPlayCircle }]
		}
		else
			return [{ name: 'quit', logo: logoQuit }, {
				name: userList.value === true ? 'conversation' : admin.value ? 'settings' : 'usersList',
				logo: userList.value === true ? logoMsg :  admin.value ? logoSettings : logoPeople,
			}]
	})

	const	btnsLength = computed(() => btns.value?.length || 0)

</script>

<template>

	<div class="ConvTag">
		<div class="ConvTag-content">
			<div class="ConvTag-infos">
				<img class="Infos-avatar" :src="target.avatar" alt="avatar">
				<div class="Infos-content">
					<div class="Infos-nameWrap">
						<span class="Infos-name">{{ target.name || target.username }}</span>
						<Status :status="target.status"/>
					</div>
					<div class="Infos-options" v-if="type === 'Friend'">
						<ActionBtn
							:class="{'ActionBtn--block': option.name === 'unblock'}"
							v-for="(option, index) in actionBtns"
							:key="index"
							:logo="option.logo"
							:hoverColor="option.color"
							:toolTip="option.toolTip"
							@click="$emit(option.name)"
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
					:class="{'ConvTag-Btns--smallLogo': btn.name === 'Conversation' || btn.name === 'Quit'}"
					@click="$emit(btn.name)"
				>
					<span class="ConvTag-Btns-logo" v-html="btn.logo"></span>
				</button>
			</div>
		</div>
	</div>

</template>

<style lang="scss">

	.Infos-content {
		width: calc(298em - v-bind(btnsLength) * 48em - v-bind(btnsLength) * 8em);
	}

</style>