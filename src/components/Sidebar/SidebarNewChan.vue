<script setup lang="ts">

	import { computed, onMounted, onUnmounted, reactive } from 'vue'
	import {
		logoProfile,
		logoLock
	} from '../../assets/logoSVG'
	import UploadAvatar from '../Utils/UploadAvatar.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import StatusBtns from './StatusBtns.vue'
	import NewChanContent from './NewChanContent.vue'
	import Btn from '../Utils/Btn.vue'
	import { useSidebarStore } from '../../stores/SidebarStore'
	import { useUserStore } from '@/stores/UserStore'
	import createRoom from '@/requests/Sidebar/Channels/createRoom'
	import type { CreateChanForm } from '@/types/Forms'
	import type { SocketEvent } from '@/types/Socket'

	const	sbStore = useSidebarStore()

	const	form: CreateChanForm = reactive({
		name: '',
		status: 'PUBLIC',
		avatar: null,
		avatarFile: null,
		password: '',
		invitees: []
	})

	const	uploadAvatar = (e:any) => {
		form.avatarFile = e.target.files[0]
		const	reader: FileReader = new FileReader()
		if (form.avatarFile)
			reader.readAsDataURL(form.avatarFile as File)
		reader.onload = (e:any) => {
			form.avatar = e.target.result
		}
	}

	const	userStore = useUserStore()
	const	socket = userStore.socket

	const	readyToCreate = computed(() => {
		if (!form.name)
			return false
		if (form.status === 'PROTECTED' && !form.password)
			return false
		return true
	})

	const	createChannel = () => {
		if (readyToCreate.value)
			createRoom(form)
	}

	let	listener: SocketEvent = { name: 'roomCreated', callback: (channelId: string) => {
			sbStore.newChan = false;
			sbStore.openConv('Channel', channelId)
		}
	}
	onMounted(() => {
		socket.on(listener.name, listener.callback)
	})

	onUnmounted(() => {
		socket.off(listener.name, listener.callback)
	})

</script>

<template>

	<div class="Sidebar-newChan">
		<div class="NewChan-infos">
			<UploadAvatar :avatar="form.avatar" id="channelAvatar-input" @change="uploadAvatar"/>
			<div class="Infos-content">
				<BaseInput
					placeholder="Name"
					v-model="form.name"
					:logo="logoProfile"
					logoSize="18em"
					inputHeight="42em"
					inputFont="500 14em 'Poppins'"
				/>
				<StatusBtns :status="form.status" @statusChanged="(status: string) => form.status = status"/>
			</div>
		</div>

		<BaseInput
			v-if="form.status === 'PROTECTED'"
			v-model="form.password"
			placeholder="Password"
			type="password"
			:logo="logoLock"
			logoSize="18em"
			inputHeight="42em"
			inputGap="12em"
			inputFont="500 14em 'Poppins'"
		/>

		<NewChanContent
			:protectedStatus="form.status === 'PROTECTED'"
			:invitees="form.invitees"
		/>

		<div class="NewChan-btns">
			<Btn
				:type=3
				value="Back"
				width="201em"
				height="48em"
				@click="sbStore.newChan = false"
			/>
			<Btn
				:class="{'Btn--inactive': !readyToCreate}"
				:type=1
				value="Create"
				width="201em"
				height="48em"
				@click="createChannel()"
			/>
		</div>
	</div>

</template>