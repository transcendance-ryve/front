export interface	ContentData {
	id: string,			//	user			id
	avatar: string,		//	user / chan		avatar
	username: string,	//	user 			name
	name: string,		//	chan 			name
	status: string,		//	user / chan		status
	usersCount: number,	//	chan			users count
	messages: any,		//	user / chan		messages
	startTime: number
}