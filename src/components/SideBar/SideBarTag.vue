<script setup lang="ts">

	import { ref, toRefs, computed } from 'vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import { logoPlay, logoSend, logoAdd, logoJoin, logoAccept, logoRefuse, logoLock } from '../../assets/logoSVG'
	import Status from './Status.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import Btn1 from '../Utils/Btn1.vue'

	const props = defineProps({
		//	1 for Friends, 2 for Channels
		type: {
			type: Number,
			default: 1,
		},
		//	1 for My friends / My channels, 2 for Add friends / Join channels
		option: {
			type: Number,
			default: 1,
		},
		name: {
			type: String,
			default: '',
		},
		lastMsg: {
			type: [String, Boolean],
			default: false,
		},
		status: {
			type: String,
			default: ''
		},
		users: {
			type: [Number, Boolean],
			default: false
		}
	})

	const p = toRefs(props);

	const	statusClass = computed(() => {
		if (p.status?.value == 'In Game')
			return 'Status--inGame'
		else
			return 'Status--' + p.status.value
	})

	const	sbStore = useSideBarStore()

</script>

<template>

	<div class="SideBarTag">
		<div class="SideBarTag-content">
			<img
				class="Content-avatar"
				src="../../assets/user.png"
				alt="user-avatar"
			>
			<div class="Content-infosWrap">
				<div class="Content-infos">
					<div class="Infos-nameWrap">
						<span class="Infos-name">{{name}}</span>
						<Status :status="status"/>
					</div>
					<Status :users="users"/>
				</div>
				<span v-if="lastMsg" class="LastMsg">
					{{lastMsg}}
				</span>
			</div>
		</div>

		<div class="SideBarTag-options" v-if="(type == 1 && option == 1)">
			<Btn1
				class="SideBarTag-btn"
				:type=1 value="Invite to party"
				:logo="logoPlay"
				width="185em"
				height="44em"
			/>
			<Btn1
				class="SideBarTag-btn"
				:type=2
				value="Send message"
				:logo="logoSend"
				width="185em"
				height="44em"
				@click="sbStore.openConv('Friend', name, status)"
			/>
		</div>

		<div
			class="SideBarTag-options"
			:class="{'SideBarTag-options--protected': status == 'Protected'}"
			v-if="option == 2 && type != 3"
		>
			<Btn1
				v-if="type == 1"
				class="SideBarTag-btn"
				:type=1
				value="Add"
				:logo="logoAdd"
				width="386em"
				height="44em"
			/>

			<BaseInput
				v-if="status == 'Protected'"
				type="password"
				placeholder="Password"
				:inputType="1"
				inputBackground="#272938"
				:logo="logoLock"
			/>

			<Btn1
				v-if="type == 2"
				class="SideBarTag-btn"
				:type=1
				value="Join"
				:logo="logoJoin"
				width="386em"
				height="40em"
			/>
		</div>

		<div v-if="type == 3" class="SideBarTag-options">
			<Btn1
				class="SideBarTag-btn"
				:type=1 value="Accept"
				:logo="logoAccept"
				width="185em"
				height="44em"
			/>
			<Btn1
				class="SideBarTag-btn"
				:type=2
				value="Refuse"
				:logo="logoRefuse"
				:fillLogo="false"
				width="185em"
				height="44em"
			/>
		</div>
	</div>

</template>
