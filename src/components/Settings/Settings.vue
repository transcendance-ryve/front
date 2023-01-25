<script setup lang="ts">

	import { onMounted, reactive, ref, type Ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import UploadAvatar from '../Utils/UploadAvatar.vue';
	import BaseInput from '../Utils/BaseInput.vue';
	import { logoProfile, logoLock, logoQrCode } from '../../assets/logoSVG'
	import ToggleSwitch from './ToggleSwitch.vue';
	import Btn from '../Utils/Btn.vue';
	import router from '@/router';
	import setUsername from '@/requests/Settings/SetUsername'
	import setAvatar from '@/requests/Settings/setAvatar'
	import setPassword from '@/requests/Settings/setPassword'
	import type { axiosState } from '@/requests/useAxios'
	import getQRCode from '@/requests/Settings/getQRCode'
	import toggle2FA from '@/requests/Settings/toggle2FA'
	import generateNewQRCode from '@/requests/Settings/generateNewQRCode'
	import type { SettingsForm } from '@/types/Forms'
	import { useNotifStore } from '@/stores/NotificationsStore';

	const	contentStore = useContentStore()
	contentStore.state = 5
	const	userStore = useUserStore()
	const	notifStore = useNotifStore()
	const	QRCode: Ref<string> = ref('')

	const	dataState: axiosState = reactive({
		error: null,
		loading: false
	})

	const	settingsData: SettingsForm = reactive({
		avatar: null,
		avatarFile: null,
		username: '',
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
		code2FA: '',
		state2FA: userStore.me.tfa_enabled
	})

	const	uploadAvatar = (e:any) => {
		settingsData.avatarFile = e.target.files[0]
		const	reader: FileReader = new FileReader()
		if (settingsData.avatarFile)
			reader.readAsDataURL(settingsData.avatarFile as File)
		reader.onload = (e:any) => {
			settingsData.avatar = e.target.result
		}
	}

	const	updateCode2FA = (e:any) => {
		if (e.target.value.length >= 6)
			e.target.value = e.target.value.slice(0, 6)
	}

	const	newQRCode = async () => {
		if (userStore.me.tfa_enabled) {
			userStore.me.tfa_enabled = false
			userStore.updateMe(userStore.me)
			settingsData.state2FA = false
		}
		QRCode.value = await generateNewQRCode(dataState)
	}

	const	checkSettings = () => {
		if (settingsData.username) {
			if (settingsData.username === userStore.me.username) {
				notifStore.addNotif('error', 'Error', 'Same username')
				return false
			}
			else if (settingsData.username.length < 4) {
				notifStore.addNotif('error', 'Error', 'Username is too short (4 min)')
				return false
			}
			else if (settingsData.username.length > 18) {
				notifStore.addNotif('error', 'Error', 'Username is too long (18 max)')
				return false
			}
		}
		if (settingsData.oldPassword) {
			if (!settingsData.newPassword) {
				notifStore.addNotif('error', 'Error', 'New password is empty')
				return false
			}
			else if(settingsData.newPassword.length < 6) {
				notifStore.addNotif('error', 'Error', 'Password is too short (6 min)')
				return false
			}
			else {
				if (settingsData.oldPassword === settingsData.newPassword) {
					notifStore.addNotif('error', 'Error', 'Cannot change with same password')
					return false
				}
				if (settingsData.newPassword !== settingsData.confirmPassword) {
					notifStore.addNotif('error', 'Error', 'Confirm password is different')
					return false
				}
			}
		}
		if (settingsData.state2FA !== userStore.me.tfa_enabled && settingsData.code2FA.length < 6) {
			notifStore.addNotif('error', 'Error', 'Invalid 2FA code')
			return false
		}
		return true
	}

	const	updateSettings = async() => {
		if (!checkSettings()) return
		let	update: boolean = false
		if (settingsData.username && settingsData.username !== userStore.me.username) {
			if (await setUsername(settingsData.username))
				update = true
		}
		if (settingsData.avatarFile) {
			if (await setAvatar(settingsData.avatarFile))
				update = true
		}
		if (settingsData.newPassword) {
			if (await setPassword(settingsData.oldPassword, settingsData.newPassword))
				update = true
		}
		if (settingsData.state2FA !== userStore.me.tfa_enabled) {
			if (await toggle2FA(settingsData.code2FA))
				update = true
			else
				settingsData.state2FA = !settingsData.state2FA
		}
		if (update) 
			notifStore.addNotif('success', 'Success', 'Settings updated')
	}

	onMounted(async () => {
		QRCode.value = await getQRCode(dataState)
	})

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
					<div class="New-password">
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
			</div>
			<div class="Setting Setting-2fa">
				<div class="Setting-tag"><span class="Tag-value">2FA</span></div>
				<h2 class="Setting-label">Update 2FA</h2>
				<div class="Setting-2fa-content">
					<img class="QrCode-2fa" :src="QRCode" alt="">
					<div class="Code-2fa">
						<div class="Toggle-wrapper">
							<h3 class="Toggle-label">Active / Disable</h3>
							<ToggleSwitch :active="settingsData.state2FA" @click="settingsData.state2FA = !settingsData.state2FA"/>
						</div>
						<BaseInput
							v-model="settingsData.code2FA"
							placeholder="Code"
							:logo="logoQrCode"
							type="number"
							@input="updateCode2FA"
						/>
						<span class="Setting-moreInfos">Enter the code to activate or desactivate the 2FA</span>
					</div>
				</div>
				<div class="GenerateBtn-wrapper">
					<Btn
						:type=3
						value="Generate new QRCode"
						width="206em"
						height="42em"
						fontSize="14em"
						@click="newQRCode()"
					/>
					<span class="Setting-moreInfos">If you generate new QRCode 2FA is disabled</span>
				</div>
			</div>
		</div>

		<div class="Settings-btns">
			<Btn
				:type=4
				value="Back"
				width="200em"
				height="52em"
				fontSize="16em"
				@click="router.back()"
			/>
			<Btn
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
