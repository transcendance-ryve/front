<script setup lang="ts">

	import { ref } from 'vue'
	import {
		logoPhoto,
		logoProfile,
		logoLock,
		logoBack,
		logoCreate,
	} from '../../assets/logoSVG'
	import BaseInput from '../Utils/BaseInput.vue'
	import NewChanContent from './NewChanContent.vue'
	import Btn1 from '../Utils/Btn1.vue'
	import { useSideBarStore } from '../../stores/SideBarStore'

	const	sbStore = useSideBarStore()
	const	name = ref('')
	const	status = ref('')
	let		chanImg = ref(null)

	const	uploadImg = (e:any) => {
		const	img = e.target.files[0]
		const	reader = new FileReader()
		reader.readAsDataURL(img)
		reader.onload = (e:any) => {
			chanImg.value = e.target.result
		}
	}

</script>

<template>

	<div class="SideBar-newChan">
		<div class="newChan-infos">
			<input
				class="Infos-inputFile"
				type="file"
				id="image-input"
				accept="image/jpeg, image/png, image/jpg"
				@change="uploadImg"
			>
			<label
				:class="{'Infos-upload': !chanImg, 'Infos-img': chanImg}"
				for="image-input"
			>
				<span v-if="!chanImg" class="Upload-logo" v-html="logoPhoto"></span>
				<span v-if="!chanImg" class="Upload-value">Upload</span>
				<img class="Infos-img" v-if="chanImg" :src="chanImg" alt="chanImg">
			</label>
			<div class="Infos-content">
				<BaseInput
					placeholder="Name"
					v-model="name"
					:inputType="2"
					:logo="logoProfile"
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
			logoSize="18rem"
			inputHeight="42rem"
			inputGap="12rem"
			inputFont="500 14em 'Poppins'"
		/>

		<NewChanContent :protectedStatus="status == 'protected'"/>

		<div class="newChan-btns">
			<Btn1
				:type=3
				value="Back"
				width="201rem"
				height="48rem"
				@click="sbStore.newChan = false"
			/>
			<Btn1
				:type=1
				value="Create"
				width="201rem"
				height="48rem"
			/>
		</div>
	</div>

</template>