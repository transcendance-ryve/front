<script setup lang="ts">

	import { toRefs, computed } from 'vue'
	import { useUserStore } from '@/stores/UserStore';

	const userStore = useUserStore()
	const	props = defineProps({
		avatar: {
			type: String
		},
		username: {
			type: String
		},
		level: {
			type: Number
		},
		experience: {
			type: Number,
			default: 0
		},
		nextLevel: {
			type: Number,
			default: 0
		},
		mainColor: {
			type: String,
			default: '#0177FB'
		},
		xpBackground: {
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

	const	percentXP = () => {
		let	percent: number = p.experience.value * 100 / p.nextLevel.value
		return percent.toString() + '%'
	}
	const	borderAvatar = p.avatarBorder.value ?
		'4em solid' + p.mainColor.value : 'none'
	const		avatarWidth = p.avatarBorder.value ? '72em' : '64em'

</script>

<template>

	<div
		class="UserInfos"
		:class="{
			'UserInfos--reverse': reverse,
			'UserInfos--XS': sizeXS,
			'UserInfos--XL': sizeXL
		}"
	>
		<img
			class="UserInfos-avatar"
			:src="avatar"
			alt="avatar"
		>
		<div class="UserInfos-content">
			<span class="Content-name">{{ username }}</span>
			<div class="Content-level">
				<span class="Level-percentXPWrap">
					<span class="Level-percentXP"></span>
				</span>
				<span class="Level">LVL {{ level }} - {{ percentXP }}</span>
			</div>
		</div>
		<slot></slot>
	</div>

</template>

<style lang="scss">

	.UserInfos-avatar {
		width: v-bind(avatarWidth);
		border: v-bind(borderAvatar);
	}

	.Level-percentXP {
		width: v-bind(percentXP);
	}

	.Level-percentXPWrap {
		background: v-bind(xpBackground);

		.Level-percentXP {
			background: v-bind(mainColor);
		}
	}

</style>