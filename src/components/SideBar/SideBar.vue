<script setup lang="ts">

	import { useSideBarStore } from '../../stores/SideBarStore'
	import SideBarTag from './SideBarTag.vue'
	import SideBarContent from './SideBarContent.vue'
	import SideBarConv from './SideBarConv.vue'
	import SideBarNewChan from './SideBarNewChan.vue'
	import { logoFriends, logoChannels, logoNotifs } from '../../assets/logoSVG'

	const	sbStore = useSideBarStore()

</script>

<template>

	<section class="BodyLayout-sidebar">
		<div class="SideBar-sectionsBtns">
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected': sbStore.state.section == 1 && sbStore.conv.open != true }"
				@click="sbStore.updateSection(1)"
			>
				<span class="SectionsBtns-Logo" v-html="logoFriends"></span>
				<span class="SectionsBtns-value">Friends</span>
			</button>
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected':
					sbStore.state.section == 2 &&
					sbStore.newChan == false &&
					sbStore.conv.open != true
				}"
				@click="sbStore.updateSection(2)"
			>
				<span class="SectionsBtns-Logo" v-html="logoChannels"></span>
				<span class="SectionsBtns-value">Channels</span>
			</button>
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected': sbStore.state.section == 3 }"
				@click="sbStore.updateSection(3)"
			>
				<span class="SectionsBtns-Logo" :class="{'Notif-active': sbStore.state.section !== 3}" v-html="logoNotifs"></span>
			</button>
		</div>

		<SideBarConv v-if="sbStore.conv.open == true" />
		<SideBarNewChan v-else-if="sbStore.newChan == true" />
		<SideBarContent v-else />
	</section>

</template>
