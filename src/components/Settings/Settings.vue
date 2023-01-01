<script setup lang="ts">

	import { ref } from 'vue'
	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import UploadAvatar from '../Utils/UploadAvatar.vue';
	import BaseInput from '../Utils/BaseInput.vue';
	import { logoProfile, logoLock, logoPhone } from '../../assets/logoSVG'

	const	contentStore = useContentStore()
	contentStore.state = 5

	const	userStore = useUserStore()

	const	avatar = ref(null)
	const	username = ref('')

	const	uploadAvatar = (e:any) => {
		const	img = e.target.files[0]
		const	reader = new FileReader()
		reader.readAsDataURL(img)
		reader.onload = (e:any) => {
			avatar.value = e.target.result
		}
	}

</script>

<template>

	<div class="mainContent-settings">
		<div class="Settings-wrapper">
			<div class="Setting Setting--profile">
				<UploadAvatar :avatar="avatar" @change="uploadAvatar"/>
				<BaseInput
					:v-model="username"
					:value="userStore.me.username"
					placeholder="Username"
					:logo="logoProfile"
				/>
			</div>
			<div class="Setting Setting-password">
				<h2 class="Setting-name">Change password</h2>
				<div class="Passwords-wrapper">
					<BaseInput
						:v-model="username"
						placeholder="Current password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						:v-model="username"
						placeholder="New password"
						:logo="logoLock"
						type="password"
					/>
					<BaseInput
						:v-model="username"
						placeholder="Confirm password"
						:logo="logoLock"
						type="password"
					/>
				</div>
			</div>
			<div class="Setting Setting-password">
				<h2 class="Setting-name">Actived / Disabled 2FA</h2>
				<div class="Passwords-wrapper">
					<BaseInput
						:v-model="username"
						placeholder="Phone number"
						:logo="logoPhone"
					/>
				</div>
			</div>
		</div>
	</div>

</template>
