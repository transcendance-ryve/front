<script setup lang="ts">

	import { useSideBarStore } from '../../stores/SideBarStore'
	import SideBarTag from './SideBarTag.vue'
	import SideBarContent from './SideBarContent.vue'
	import Conv from './Conv.vue'
	import SideBarNewChan from './SideBarNewChan.vue'
	import { logoFriends, logoChannels, logoNotifs } from '../../assets/logoSVG'

	const	sbStore = useSideBarStore()

</script>

<template>

	<section class="BodyLayout-sidebar">
		<div class="SideBar-sectionsBtns">
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected': sbStore.section == 1 && sbStore.conv.open != true }"
				@click="sbStore.updateSection(1)"
			>
				<span class="SectionsBtns-Logo" v-html="logoFriends"></span>
				<span class="SectionsBtns-value">Friends</span>
			</button>
			<button
				class="SectionsBtns"
				:class="{ 'SectionBtns--selected':
					sbStore.section == 2 &&
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
				:class="{ 'SectionBtns--selected': sbStore.section == 3 }"
				@click="sbStore.updateSection(3)"
			>
				<span class="SectionsBtns-Logo" v-html="logoNotifs"></span>
			</button>
		</div>

		<Conv v-if="sbStore.conv.open == 1" />
		<SideBarNewChan v-else-if="sbStore.newChan == true" />
		<SideBarContent v-else />
	</section>

</template>
