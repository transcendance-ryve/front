<script setup lang="ts">

	import { reactive, computed, onMounted, onUnmounted } from 'vue'
	import { useUserStore } from '@/stores/UserStore'
	import UploadAvatar from '@/components/Utils/UploadAvatar.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import StatusBtns from './StatusBtns.vue'
	import Btn1 from '../Utils/Btn1.vue'
	import ConvList from './ConvList.vue'
	import editChannel from '@/requests/SideBar/editChannel'
	import type { Form } from '@/requests/SideBar/editChannel'
	import type { Target } from './SideBarConv.vue'
	import {
		logoProfile,
		logoLock
	} from '../../assets/logoSVG'

	export interface Props {
		channel: Target
		role: string
	}

	const	props = defineProps<Props>()

	const	form: Form = reactive({
		id: props.channel.id,
		name: '',
		status: props.channel.status,
		avatar: null,
		avatarFile: null,
		password: '',
	})

	const	uploadAvatar = (e:any) => {
		form.avatarFile = e.target.files[0]
		const	reader: FileReader = new FileReader()
		reader.readAsDataURL(form.avatarFile as File)
		reader.onload = (e:any) => {
			form.avatar = e.target.result
		}
	}

	const	readyToUpdate = computed(() => {
		const	chan = props.channel
		if (!form.avatar && !form.name &&
				((form.status !== 'PROTECTED' && form.status === chan.status) ||
				form.status === 'PROTECTED' && chan.status === 'PROTECTED' && !form.password))
			return false
		if (form.name && form.name === chan.name)
			return false
		if (form.status === 'PROTECTED' && chan.status !== 'PROTECTED' && !form.password)
			return false
		return true
	})

	const	updatedChan = () => {
		if (readyToUpdate.value) {
			let	formToUpdate: Partial<Form> = form
			if (!formToUpdate.name)
				delete formToUpdate.name
			if (formToUpdate.status !== 'PROTECTED' &&
				(formToUpdate.status === 'PROTECTED' && !formToUpdate.password && props.channel.status === 'PROTECTED'))
				delete formToUpdate.password
				
			editChannel(formToUpdate)
		}
	}

	const	emit = defineEmits(['update', 'close'])
	const	userStore = useUserStore()
	let		listener: any

	onMounted(() => {
		listener = userStore.socket.once('roomEdited', () => emit('update'))
	})

	onUnmounted(() => {
		userStore.socket.off(listener)
	})

</script>

<template>

	<div class="ChanSettings">
		<div class="Settings-infos">
			<UploadAvatar :avatar="form.avatar" id="channelAvatar-input" @change="uploadAvatar"/>
			<div class="Infos-content">
				<BaseInput
					:placeholder="channel.name"
					v-model="form.name"
					:logo="logoProfile"
					logoSize="18em"
					inputHeight="42em"
					inputFont="500 14em 'Poppins'"
				/>
				<StatusBtns :status="form.status" @statusChanged="status => form.status = status"/>
			</div>
		</div>

		<BaseInput
			v-if="form.status === 'PROTECTED'"
			v-model="form.password"
			:placeholder="channel.status === 'PROTECTED' ? 'Change password' : 'Password'"
			type="password"
			:logo="logoLock"
			logoSize="18em"
			inputHeight="42em"
			inputGap="12em"
			inputFont="500 14em 'Poppins'"
		/>

		<ConvList :channelId="channel.id" :role="role"/>

		<div class="Settings-btns">
			<Btn1
				:type=3
				value="Back"
				width="201em"
				height="48em"
				@click="$emit('close')"
			/>
			<Btn1
				:class="{'Btn--inactive': !readyToUpdate}"
				:type=1
				value="Update"
				width="201em"
				height="48em"
				@click="updatedChan"
			/>
		</div>
	</div>

</template>
