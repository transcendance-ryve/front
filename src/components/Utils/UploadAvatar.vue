<script setup lang="ts">

	import { withDefaults } from 'vue';
	import { logoPhoto } from '../../assets/logoSVG'

	interface Props {
		id: string,
		avatar: string | null
	}

	withDefaults(defineProps<Props>(), {
		id: 'image-input',
		avatar: null
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
