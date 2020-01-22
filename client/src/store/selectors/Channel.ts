import { Store } from "../../typings";
import { createSelector } from "reselect";

const selectChannel = ( channelId: string ) => ( store: Store ) => store.channels.find(
	channel => channel.id === channelId );

export const selectChannelHeader = ( channelId: string ) => createSelector(
	[ selectChannel( channelId ) ], channel => (
		{
			name : channel.name,
			members : channel.members,
			id : channel.id
		}
	) );


export const selectChannelMessages = ( channelId: string ) => createSelector(
	[ selectChannel( channelId ) ],
	channel => channel.messages
);
