<script setup lang="ts">

	import { useContentStore } from '../../stores/ContentStore'
	import { useUserStore } from '../../stores/UserStore'
	import router from '../../router/index'

	const	contentStore = useContentStore()
	const	userStore = useUserStore()

	const	profileRedirect = () => {
		contentStore.state = 4
		const	profilePath = '/profile/' + userStore.me.id
		router.push({ path:profilePath })
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
