<script setup lang="ts">

	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import { useProfileStore } from '../../stores/ProfileStore'	// a suppr
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

	<div class="UserMenu-wrap">
		<div class="UserMenu">
			<button class="User-options" @click="profileRedirect()">
				<span class="Options-value">Profile</span>
			</button>
			<button class="User-options">
				<span class="Options-value">Settings</span>
			</button>
			<button class="User-options" @click="userStore.disconnect()">
				<span class="Options-value">Disconnect</span>
			</button>
		</div>
	</div>

</template>
