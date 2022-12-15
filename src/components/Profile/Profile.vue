<script setup lang="ts">

	import { useNavBarStore } from '../../stores/NavBarStore'
	import { useProfileStore } from '../../stores/ProfileStore'
	import { useUserStore } from '../../stores/UserStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'

	const	nbStore = useNavBarStore()
	nbStore.nbState = 0

	const	profileStore = useProfileStore()
	const	userStore = useUserStore()

	if (profileStore.type == 1)
		profileStore.setProfile(userStore.user)

	let		statsIndex = 0;

</script>

<template>

	<div class="mainContent-profile">
		<ProfileTag
			:user="profileStore.profile"
		/>
		<div class="Profile-section">
			<h2>Statistics</h2>
			<div class="StatisticsWrap">
				<ProfileStat
					v-for="(stat, index) in profileStore.profile.stats"
					:key="index"
					:ind="statsIndex++"
					:value="stat"
				/>
			</div>
		</div>
		<div class="Profile-section">
			<h2>Match History</h2>
		</div>
	</div>

</template>
