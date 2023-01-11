<script setup lang="ts">

	import { reactive, toRefs, computed } from 'vue'
	import UploadAvatar from '../Utils/UploadAvatar.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import StatusBtns from './StatusBtns.vue'
	import Btn1 from '../Utils/Btn1.vue'
	import ConvList from './ConvList.vue'
	import type { Form } from '@/requests/SideBar/createRoom'
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
	const	p = toRefs(props)
	// const	props = toRefs(defineProps<Props>())

	const	form: Form = reactive({
		name: '',
		status: p.channel.value.status,
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

	const	readyToUpdate = computed(() => {
		const	chan = p.channel.value
		if ((form.name && form.name !== chan.name)
				|| (form.status !== chan.status
				|| (chan.status === 'PROTECTED' && form.password))
				|| form.avatar)
			return true
		return false
	})

	const	updatedChan = () => {
		if (readyToUpdate.value)
			console.log('update chan')
	}

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

		<ConvList :id="channel.id" :role="role"/>

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
