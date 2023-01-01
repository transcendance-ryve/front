<script setup lang="ts">

	import { logoPhoto } from '../../assets/logoSVG'

	const props = defineProps({
		avatar: {
			type: null,
			default: null
		}
	})

</script>

<template>

	<div class="UploadAvatar">
		<input
			class="Infos-inputFile"
			type="file"
			id="image-input"
			accept="image/jpeg, image/png, image/jpg"
		>
		<label
			:class="{'Infos-upload': !avatar, 'Infos-img': avatar}"
			for="image-input"
		>
			<span v-if="!avatar" class="Upload-logo" v-html="logoPhoto"></span>
			<span v-if="!avatar" class="Upload-value">Upload</span>
			<img class="Infos-img" v-if="avatar" :src="avatar" alt="avatar">
		</label>
	</div>

</template>
