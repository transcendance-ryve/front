<script setup lang="ts">

	import { ref } from 'vue'
	import ConvTag from './ConvTag.vue'
	import ConvContent from './ConvContent.vue'
	import ConvList from './ConvList.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import { logoSend } from '../../assets/logoSVG'
	import { useSideBarStore } from '../../stores/SideBarStore'

	const	sbStore = useSideBarStore()

	const	userList = ref(false)

</script>

<template>

	<div class="SideBarConv">
		<div
			class="SideBarConv-contentWrap"
			:class="{'ContentWrap--List': userList == true}"
		>
			<ConvTag
				:type="sbStore.conv.type"
				:name="sbStore.conv.name"
				:status="sbStore.conv.status"
				@userList="userList = true"
				@conv="userList = false"
			/>
			<ConvContent v-if="!userList" />
			<ConvList v-if="userList" />
		</div>
		<BaseInput
			v-if="!userList"
			placeholder="Write your message"
			:logo="logoSend"
			logoSize="24em"
			inputHeight="72em"
			inputPadding="16em"
			inputGap="8em"
			borderRadius="0 0 16em 16em"
			inputFont="500 18em 'Poppins'"
		/>
	</div>

</template>
