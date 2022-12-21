<script setup lang="ts">

	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import { useProfileStore } from '../../stores/ProfileStore'
	import router from '../../router/index'

	const	contentStore = useContentStore()
	const	userStore = useUserStore()
	const	profileStore = useProfileStore()

	const	profileRedirect = () => {
		profileStore.setProfile(userStore.user, 1)
		contentStore.state = 4
		const	profilePath = '/profile/' + userStore.user.userName
		router.push({path:profilePath})
	}

</script>

<template>

	<div class="UserMenu">
		<button class="User-options" @click="profileRedirect()">Profile</button>
		<button class="User-options">Settings</button>
		<button class="User-options" @click="userStore.disconnect()">Disconnect</button>
	</div>

</template>
