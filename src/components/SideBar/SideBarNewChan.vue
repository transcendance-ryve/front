<script setup lang="ts">

	import { ref } from 'vue'
	import {
		logoProfile,
		logoLock,
		logoBack,
		logoCreate,
	} from '../../assets/logoSVG'
	import UploadAvatar from '../Utils/UploadAvatar.vue'
	import BaseInput from '../Utils/BaseInput.vue'
	import NewChanContent from './NewChanContent.vue'
	import Btn1 from '../Utils/Btn1.vue'
	import { useSideBarStore } from '../../stores/SideBarStore'

	const	sbStore = useSideBarStore()
	const	name = ref('')
	const	status = ref('')
	const	chanAvatar = ref(null)

	const	uploadAvatar = (e:any) => {
		const	img = e.target.files[0]
		const	reader = new FileReader()
		reader.readAsDataURL(img)
		reader.onload = (e:any) => {
			chanAvatar.value = e.target.result
		}
	}

</script>

<template>

	<div class="SideBar-newChan">
		<div class="newChan-infos">
			<UploadAvatar :avatar="chanAvatar" id="channelAvatar-input" @change="uploadAvatar"/>
			<div class="Infos-content">
				<BaseInput
					placeholder="Name"
					v-model="name"
					:logo="logoProfile"
					logoSize="18em"
					inputHeight="42em"
					inputFont="500 14em 'Poppins'"
				/>
				<div class="Content-statusBtns">
					<button
						class="StatusBtn"
						:class="{
							'StatusBtn-public': status != 'public',
							'StatusBtn-public--selected': status == 'public'
						}"
						@click="status = 'public'"
					>
						<span class="StatusBtn-value">Public</span>
					</button>
					<button
						class="StatusBtn"
						:class="{
							'StatusBtn-protected': status != 'protected',
							'StatusBtn-protected--selected': status == 'protected'
						}"
						@click="status = 'protected'"
					>
						<span class="StatusBtn-value">Protected</span>
					</button>
					<button
						class="StatusBtn"
						:class="{
							'StatusBtn-private': status != 'private',
							'StatusBtn-private--selected': status == 'private'
						}"
						@click="status = 'private'"
					>
						<span class="StatusBtn-value">Private</span>
					</button>
				</div>
			</div>
		</div>

		<BaseInput
			v-if="status == 'protected'"
			placeholder="Password"
			:logo="logoLock"
			logoSize="18em"
			inputHeight="42em"
			inputGap="12em"
			inputFont="500 14em 'Poppins'"
		/>

		<NewChanContent :protectedStatus="status == 'protected'"/>

		<div class="newChan-btns">
			<Btn1
				:type=3
				value="Back"
				width="201em"
				height="48em"
				@click="sbStore.newChan = false"
			/>
			<Btn1
				:type=1
				value="Create"
				width="201em"
				height="48em"
			/>
		</div>
	</div>

</template>