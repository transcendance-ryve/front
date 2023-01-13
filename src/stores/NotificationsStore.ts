import { reactive } from 'vue'
import { defineStore } from 'pinia'

export interface notification { id: string, type: string, label: string, text: string, avatar: string }

export const useNotifStore = defineStore('notifStore', () => {
	const	notifs: notification[] = reactive([])

	const	addNotif = (type: string, label: string = '', text: string = '', avatar: string = '') => {
		const	id: string = new Date().getTime().toString()
		notifs.push({ id, type, label, text, avatar })
	}

	const	removeNotif = (id: string) => {
		notifs.splice(notifs.findIndex(notif => notif.id === id), 1)
		console.log('notif removed', notifs)
	}

	return {
		notifs,
		addNotif,
		removeNotif
	}
})