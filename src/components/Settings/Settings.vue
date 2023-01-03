<script setup lang="ts">

	import { reactive, ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import UploadAvatar from '../Utils/UploadAvatar.vue';
	import BaseInput from '../Utils/BaseInput.vue';
	import { logoProfile, logoLock, logoPhone } from '../../assets/logoSVG'
	import ToggleSwitch from './ToggleSwitch.vue';
	import Btn1 from '../Utils/Btn1.vue';
	import router from '@/router';
	import setUsername from '@/requests/Settings/SetUsername'

	const	contentStore = useContentStore()
	contentStore.state = 5

	const	userStore = useUserStore()

	type	data = {
		avatar: null,
		username: string,
		oldPassword: string,
		newPassword: string,
		confirmPassword: string,
		phoneNumber: string,
		phoneInputValue: string,
		active2FA: boolean
	}

	const	formData: data = reactive({
		avatar: null,
		username: userStore.me.username,
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
		phoneNumber: '07 81 33 44 30',
		phoneInputValue: '07 81 33 44 30',
		active2FA: false
	})

	const	uploadAvatar = (e:any) => {
		const	img: File = e.target.files[0]
		console.log('img', img)
		const	reader: FileReader = new FileReader()
		reader.readAsDataURL(img)
		reader.onload = (e:any) => {
			formData.avatar = e.target.result
			console.log('avatar', formData.avatar)
		}
	}

	const	updatePhoneNumber = () => {
		const	length = formData.phoneNumber.length
		if (isNaN(parseInt(formData.phoneNumber[length - 1])))
			formData.phoneNumber = formData.phoneNumber.slice(0, length - 1)
		else if (length > 2 && !isNaN(parseInt(formData.phoneNumber[length - 2])) && !isNaN(parseInt(formData.phoneNumber[length - 3]))) {
			const	value = formData.phoneNumber[length - 1]
			formData.phoneNumber = formData.phoneNumber.slice(0, length - 1) + ' ' + value
		}
		formData.phoneInputValue = formData.phoneNumber
	}

	const	checkSettings = () => {
		let	error: string = ''

		if (!formData.username) {
			error = 'Empty username'
		}
		if (formData.oldPassword) {
			if (!formData.newPassword)
				error = error ? error + '\nEmpty new password' : 'Empty new password'
			else {
				if (formData.oldPassword === formData.newPassword)
					error = error ? error + '\nCannot change with same password' : 'Cannot change with same password'
				if (formData.newPassword !== formData.confirmPassword)
					error = error ? error + '\nConfirm password is different' : 'Confirm password is different'
			}
		}

		if (error) {
			alert(error)
			return false
		}
		return true
	}

	const	updateSettings = () => {
		checkSettings()
		if (formData.username !== userStore.me.username)
			setUsername(formData.username)

	}

</script>

<template>

	<div class="mainContent-settings">
		<div class="Settings-wrapper">
			<div class="Setting Setting--profile">
				<div class="Setting-tag"><span class="Tag-value">Profile</span></div>
				<UploadAvatar :avatar="formData.avatar" id="userAvatar-input" @change="uploadAvatar"/>
				<BaseInput
					v-model="formData.username"
					:value="formData.username"
					placeholder="Username"
					:logo="logoProfile"
				/>
			</div>
			<div class="Setting Setting-password">
				<div class="Setting-tag"><span class="Tag-value">Password</span></div>
				<h2 class="Setting-label">Change password</h2>
				<div class="Passwords-wrapper">
					<BaseInput
						v-model="formData.oldPassword"
						placeholder="Old password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						v-model="formData.newPassword"
						placeholder="New password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						v-model="formData.confirmPassword"
						placeholder="Confirm password"
						:logo="logoLock"
						type="password"
					/>
				</div>
			</div>
			<div class="Setting Setting-password">
				<div class="Setting-tag"><span class="Tag-value">2FA</span></div>
				<div class="Label-wrapper">
					<h2 class="Setting-label">Actived / Disabled 2FA</h2>
					<ToggleSwitch :active="formData.active2FA" @click="formData.active2FA = !formData.active2FA"/>
				</div>
				<div class="Passwords-wrapper">
					<BaseInput
						v-model="formData.phoneNumber"
						:value="formData.phoneInputValue"
						placeholder="Phone number"
						:logo="logoPhone"
						maxlength="14"
						@keyup="updatePhoneNumber()"
					/>
				</div>
			</div>
		</div>

		<div class="Settings-btns">
			<Btn1
				:type=4
				value="Back"
				width="200em"
				height="52em"
				fontSize="16em"
				@click="router.back()"
			/>
			<Btn1
				:type=1
				value="Update"
				width="200em"
				height="52em"
				fontSize="16em"
				@click="updateSettings()"
			/>
		</div>
	</div>

</template>
