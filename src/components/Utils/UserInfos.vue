<script setup lang="ts">

	import { toRefs } from 'vue'

	const	props = defineProps({
		userName: {
			type: String
		},
		level: {
			type: Number
		},
		levelPerCent: {
			type: Number
		},
		mainColor: {
			type: String,
			default: '#0177FB'
		},
		perCentBackground: {
			type: String,
			default: '#1F1E2C'
		},
		avatarBorder: {
			type: Boolean,
			default: false
		},
		reverse: {
			type: Boolean,
			default: false
		},
		responsive: {
			type: Boolean,
			default: true
		},
		sizeXS: {
			type: Boolean,
			default: false
		},
		sizeXL: {
			type: Boolean,
			default: false
		}
	})

	const	p = toRefs(props)

	const	perCent = p.levelPerCent?.value?.toString() + '%'
	const	borderAvatar = p.avatarBorder.value ?
		'4em solid' + p.mainColor.value : 'none'

</script>

<template>

	<div
		class="UserInfos"
		:class="{
			'UserInfos--reverse': reverse,
			'UserInfos--static': !responsive,
			'UserInfos--XS': sizeXS,
			'UserInfos--XL': sizeXL
		}"
	>
		<img class="UserInfos-avatar" src="../../assets/user.png" alt="avatar">
		<div class="UserInfos-content">
			<span class="Content-name">{{ userName }}</span>
			<div class="Content-level">
				<span class="Level-perCentWrap">
					<span class="Level-perCent"></span>
				</span>
				<span class="Level">LVL {{ level }} - {{ perCent }}</span>
			</div>
		</div>
		<slot></slot>
	</div>

</template>

<style lang="scss">

	.UserInfos-avatar {
		border: v-bind(borderAvatar);
	}

	.Level-perCent {
		width: v-bind(perCent);
	}

	.Level-perCentWrap {
		background: v-bind(perCentBackground);

		.Level-perCent {
			background: v-bind(mainColor);
		}
	}

</style>