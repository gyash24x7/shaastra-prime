import { AddUsersToChannelResolver } from "./AddUsersToChannel";
import { CreateChannelResolver } from "./CreateChannel";
import { DeleteChannelResolver } from "./DeleteChannel";
import { ChannelFieldResolvers } from "./FieldResolvers";
import { GetChannelDetailsResolver } from "./GetChannelDetails";
import { GetChannelsResolver } from "./GetChannels";
import { UpdateChannelResolver } from "./UpdateChannel";

export default [
	CreateChannelResolver,
	GetChannelsResolver,
	ChannelFieldResolvers,
	AddUsersToChannelResolver,
	DeleteChannelResolver,
	UpdateChannelResolver,
	GetChannelDetailsResolver
];
