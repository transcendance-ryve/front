<script setup lang="ts">

	import { logoPhoto } from '../../assets/logoSVG'

	const props = defineProps({
		id: {
			type: String,
			default: 'image-input'
		},
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
			:id="id"
			accept="image/jpeg, image/png, image/jpg, image/gif"
		>
		<label
			:class="{'Infos-upload': !avatar, 'Infos-img': avatar}"
			:for="id"
		>
			<span v-if="!avatar" class="Upload-logo" v-html="logoPhoto"></span>
			<span v-if="!avatar" class="Upload-value">Upload</span>
			<img class="Infos-img" v-if="avatar" :src="avatar" alt="avatar">
		</label>
	</div>

</template>
