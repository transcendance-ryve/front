<script setup lang="ts">

	import { useNavBarStore } from '../../stores/NavBarStore'
	import { useProfileStore } from '../../stores/ProfileStore'
	import { useUserStore } from '../../stores/UserStore'
	import ProfileTag from './ProfileTag.vue'
	import ProfileStat from './ProfileStat.vue'
	import MatchHistory from './MatchHistory.vue'

	const	nbStore = useNavBarStore()
	nbStore.nbState = 0

	const	profileStore = useProfileStore()
	const	userStore = useUserStore()

	// if (profileStore.type == 1)
	// 	profileStore.setProfile(userStore.user)
	let	profile: Object
	if (profileStore.type == 1)
		profile = userStore.user
	else
		profile = profileStore.profile

</script>

<template>

	<div class="mainContent-profile">
		<ProfileTag
			:user="profile"
		/>
		<div class="Profile-section">
			<h2>Statistics</h2>
			<div class="StatisticsWrap">
				<ProfileStat
					v-for="(stat, name, index) in profile.stats"
					:key="name"
					:ind="index"
					:value="stat"
				/>
			</div>
		</div>
		<div class="Profile-section">
			<h2>Match History</h2>
			<MatchHistory />
		</div>
	</div>

</template>
