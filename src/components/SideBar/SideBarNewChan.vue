<script setup lang="ts">

	import { onMounted, reactive } from 'vue'
	import {
		logoProfile,
		logoLock,
		logoBack,
		logoCreate,
	} from '../../assets/logoSVG'
	import UploadAvatar from '../Utils/UploadAvatar.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import NewChanContent from './NewChanContent.vue'
	import Btn1 from '../Utils/Btn1.vue'
	import { useSideBarStore } from '../../stores/SideBarStore'
	import { useUserStore } from '@/stores/UserStore'
	import createRoom from '@/requests/SideBar/createRoom'
	import type { Form } from '@/requests/SideBar/createRoom'

	const	sbStore = useSideBarStore()

	const	form: Form = reactive({
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
		reader.readAsDataURL(form.avatarFile as File)
		reader.onload = (e:any) => {
			form.avatar = e.target.result
		}
	}

	const	userStore = useUserStore()
	const	socket = userStore.socket

	const	createChannel = () => {
		//	handle errors
		let	error = false
		if (!form.name) {
			alert('Empty name')
			error = true
		}
		if (form.status === 'PROTECTED' && !form.password) {
			alert('Empty password')
			error = true
		}
		if (!error) {
			console.log('before create', form.invitees)
			createRoom(form)
		}
	}

	onMounted(() => {
		if (!sbStore.componentState.newChan) {
			socket.on('roomCreated', (channelId: string) => {
				sbStore.newChan = false;
				sbStore.openConv('Channel', channelId)
			})
			sbStore.componentState.newChan = true
		}
	})

</script>

<template>

	<div class="SideBar-newChan">
		<div class="newChan-infos">
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
				<div class="Content-statusBtns">
					<button
						class="StatusBtn"
						:class="{
							'StatusBtn-public': form.status !== 'PUBLIC',
							'StatusBtn-public--selected': form.status === 'PUBLIC'
						}"
						@click="form.status = 'PUBLIC'"
					>
						<span class="StatusBtn-value">Public</span>
					</button>
					<button
						class="StatusBtn"
						:class="{
							'StatusBtn-protected': form.status !== 'PROTECTED',
							'StatusBtn-protected--selected': form.status === 'PROTECTED'
						}"
						@click="form.status = 'PROTECTED'"
					>
						<span class="StatusBtn-value">Protected</span>
					</button>
					<button
						class="StatusBtn"
						:class="{
							'StatusBtn-private': form.status !== 'PRIVATE',
							'StatusBtn-private--selected': form.status === 'PRIVATE'
						}"
						@click="form.status = 'PRIVATE'"
					>
						<span class="StatusBtn-value">Private</span>
					</button>
				</div>
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

		<div class="newChan-btns">
			<Btn1
				:type=3
				value="Back"
				width="201em"
				height="48em"
				@click="sbStore.newChan = false"
			/>
			<Btn1
				:type=1
				value="Create"
				width="201em"
				height="48em"
				@click="createChannel()"
			/>
		</div>
	</div>

</template>