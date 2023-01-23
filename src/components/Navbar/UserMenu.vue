<script setup lang="ts">

	import { useUserStore } from '../../stores/UserStore'
	import router, { profileRedirect } from '../../router/index'
	import disconnect from '@/requests/Auth/disconnect'

	const	userStore = useUserStore()

</script>

<template>

	<div class="UserMenu-wrap">
		<div class="UserMenu">
			<button class="User-options" @click="profileRedirect(userStore.me.id)">
				<span class="Options-value">Profile</span>
			</button>
			<button class="User-options" @click="router.push({ path:'/settings' })">
				<span class="Options-value">Settings</span>
			</button>
			<button class="User-options" @click="disconnect()">
				<span class="Options-value">Disconnect</span>
			</button>
		</div>
	</div>

</template>
