<script setup lang="ts">

	import { ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import UploadAvatar from '../Utils/UploadAvatar.vue';
	import BaseInput from '../Utils/BaseInput.vue';
	import { logoProfile, logoLock, logoPhone } from '../../assets/logoSVG'
	import ToggleSwitch from './ToggleSwitch.vue';
	import Btn1 from '../Utils/Btn1.vue';
	import router from '@/router';

	const	contentStore = useContentStore()
	contentStore.state = 5

	const	userStore = useUserStore()

	const	avatar = ref(null)
	const	username = ref(userStore.me.username)
	const	currentPassword = ref('')
	const	newPassword = ref('')
	const	confirmPassword = ref('')
	const	phoneNumber = ref('07 81 33 44 30')
	const	phoneInputValue = ref('07 81 33 44 30')
	const	active2FA = ref(false)

	const	uploadAvatar = (e:any) => {
		const	img = e.target.files[0]
		const	reader = new FileReader()
		reader.readAsDataURL(img)
		reader.onload = (e:any) => {
			avatar.value = e.target.result
		}
	}

	const	test = () => {
		const	length = phoneNumber.value.length
		if (isNaN(parseInt(phoneNumber.value[length - 1])))
			phoneNumber.value = phoneNumber.value.slice(0, length - 1)
		else if (length > 2 && !isNaN(parseInt(phoneNumber.value[length - 2])) && !isNaN(parseInt(phoneNumber.value[length - 3]))) {
			const	value = phoneNumber.value[length - 1]
			phoneNumber.value = phoneNumber.value.slice(0, length - 1) + ' ' + value
		}
		phoneInputValue.value = phoneNumber.value
	}

</script>

<template>

	<div class="mainContent-settings">
		<div class="Settings-wrapper">
			<div class="Setting Setting--profile">
				<div class="Setting-tag"><span class="Tag-value">Profile</span></div>
				<UploadAvatar :avatar="avatar" @change="uploadAvatar"/>
				<BaseInput
					v-model="username"
					:value="username"
					placeholder="Username"
					:logo="logoProfile"
				/>
			</div>
			<div class="Setting Setting-password">
				<div class="Setting-tag"><span class="Tag-value">Password</span></div>
				<h2 class="Setting-label">Change password</h2>
				<div class="Passwords-wrapper">
					<BaseInput
						v-model="currentPassword"
						placeholder="Current password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						v-model="newPassword"
						placeholder="New password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						v-model="confirmPassword"
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
					<ToggleSwitch :active="active2FA" @click="active2FA = !active2FA"/>
				</div>
				<div class="Passwords-wrapper">
					<BaseInput
						v-model="phoneNumber"
						:value="phoneInputValue"
						placeholder="Phone number"
						:logo="logoPhone"
						maxlength="14"
						@keyup="test()"
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
			/>
		</div>
	</div>

</template>
