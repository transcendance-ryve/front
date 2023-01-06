<script setup lang="ts">

	import { computed, onMounted, reactive, ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import UploadAvatar from '../Utils/UploadAvatar.vue';
	import BaseInput from '../Utils/BaseInput.vue';
	import { logoProfile, logoLock, logoQrCode } from '../../assets/logoSVG'
	import ToggleSwitch from './ToggleSwitch.vue';
	import Btn1 from '../Utils/Btn1.vue';
	import router from '@/router';
	import setUsername from '@/requests/Settings/SetUsername'
	import setAvatar from '@/requests/Settings/setAvatar'
	import setPassword from '@/requests/Settings/setPassword'
	import type { axiosState } from '@/requests/useAxios'
	import getQRCode from '@/requests/Settings/getQRCode';

	const	contentStore = useContentStore()
	contentStore.state = 5

	const	userStore = useUserStore()

	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})

	type	data = {
		avatar: null,
		avatarFile: File | null,
		username: string,
		oldPassword: string,
		newPassword: string,
		confirmPassword: string,
		code2FA: string
		active2FA: boolean
	}

	const	settingsData: data = reactive({
		avatar: null,
		avatarFile: null,
		username: '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
		code2FA: '',
		active2FA: false
	})

	const	uploadAvatar = (e:any) => {
		settingsData.avatarFile = e.target.files[0]
		const	reader: FileReader = new FileReader()
		reader.readAsDataURL(settingsData.avatarFile as File)
		reader.onload = (e:any) => {
			settingsData.avatar = e.target.result
		}
	}

	const	checkSettings = () => {
		let	error: string = ''

		if (settingsData.username === userStore.me.username)
			error = 'Cannot change with same username'
		if (settingsData.oldPassword) {
			if (!settingsData.newPassword)
				error = error ? error + '\nEmpty new password' : 'Empty new password'
			else {
				if (settingsData.oldPassword === settingsData.newPassword)
					error = error ? error + '\nCannot change with same password' : 'Cannot change with same password'
				if (settingsData.newPassword !== settingsData.confirmPassword)
					error = error ? error + '\nConfirm password is different' : 'Confirm password is different'
			}
		}

		if (error) {
			alert(error)
			return false
		}
		return true
	}

	const	updateSettings = async() => {
		if (!checkSettings())
			return
		if (settingsData.username && settingsData.username !== userStore.me.username)
			setUsername(settingsData.username)
		if (settingsData.avatarFile)
			setAvatar(settingsData.avatarFile)
		if (settingsData.newPassword && !await setPassword(settingsData.oldPassword, settingsData.newPassword))
			alert('wrong passord')
	}

	const	QRCode = ref('')
	const	getQR = async () => {
		QRCode.value = await getQRCode(dataState)
	}
	getQR()

	// onMounted(async () => {
	// 	QRCode = await getQRCode(dataState)
	// 	console.log(QRCode)
	// })

</script>

<template>

	<div class="mainContent-settings">
		<div class="Settings-wrapper">
			<div class="Setting Setting--profile">
				<div class="Setting-tag"><span class="Tag-value">Profile</span></div>
				<UploadAvatar :avatar="settingsData.avatar" id="userAvatar-input" @change="uploadAvatar"/>
				<BaseInput
					v-model="settingsData.username"
					:placeholder="userStore.me.username"
					:logo="logoProfile"
				/>
			</div>
			<div class="Setting Setting-password">
				<div class="Setting-tag"><span class="Tag-value">Password</span></div>
				<h2 class="Setting-label">Change password</h2>
				<div class="Passwords-wrapper">
					<BaseInput
						v-model="settingsData.oldPassword"
						placeholder="Old password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						v-model="settingsData.newPassword"
						placeholder="New password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						v-model="settingsData.confirmPassword"
						placeholder="Confirm password"
						:logo="logoLock"
						type="password"
					/>
				</div>
			</div>
			<div class="Setting Setting-2fa">
				<div class="Setting-tag"><span class="Tag-value">2FA</span></div>
				<h2 class="Setting-label">Update 2FA</h2>
				<div class="Setting-2fa-content">
					<!-- <span class="QrCode-2fa"></span> -->
					<img class="QrCode-2fa" :src="QRCode" alt="">
					<div class="Code-2fa">
						<div class="Toggle-wrapper">
							<h3 class="Toggle-label">Active / Disable</h3>
							<ToggleSwitch :active="settingsData.active2FA" @click="settingsData.active2FA = !settingsData.active2FA"/>
						</div>
						<BaseInput
							v-model="settingsData.code2FA"
							placeholder="Code"
							:logo="logoQrCode"
							maxlength="6"
						/>
						<span class="Setting-moreInfos">Enter the code to activate or desactivate the 2FA</span>
					</div>
				</div>
				<div class="GenerateBtn-wrapper">
					<Btn1
						:type=3
						value="Generate new QRCode"
						width="206em"
						height="42em"
						fontSize="14em"
					/>
					<span class="Setting-moreInfos">If you generate new QRCode 2FA is disabled</span>
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
