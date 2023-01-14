export interface	ContentData {
	id: string,			//	user			id
	avatar: string,		//	user / chan		avatar
	username: string,	//	user 			name
	name: string,		//	chan 			name
	status: string,		//	user / chan		status
	lastMsg: string,	//	user / chan		last message
	usersCount: number,	//	chan			users count
	messages: any[]		//	user / chan		messages
}