<script setup lang="ts">

	

</script>

<template>

	<div class="UserMenu">
		<RouterLink
		class="User-options"
			:to="profilePath"
			@click="profileRedirect()"
		>
			Profile
		</RouterLink>
		<button class="User-options">Settings</button>
		<button class="User-options" @click="$emit('disconnect')">Disconnect</button>
	</div>

</template>
