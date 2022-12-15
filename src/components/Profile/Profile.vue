<script setup lang="ts">

	import { useNavBarStore } from '../../stores/NavBarStore'
	import { useProfileStore } from '../../stores/ProfileStore'
	import { useUserStore } from '../../stores/UserStore'
	import ProfileTag from './ProfileTag.vue'

	const	nbStore = useNavBarStore()
	nbStore.nbState = 0

	const	profileStore = useProfileStore()
	const	userStore = useUserStore()

	if (profileStore.type == 1)
		profileStore.setProfile(userStore.user)

</script>

<template>

	<div class="mainContent-profile">
		<ProfileTag
			:user="profileStore.profile"
		/>
	</div>

</template>
