import { AddUsersToChannelResolver } from "./AddUsersToChannel";
import { CreateChannelResolver } from "./CreateChannel";
import { DeleteChannelResolver } from "./DeleteChannel";
import { ChannelFieldResolvers } from "./FieldResolvers";
import { GetChannelDetailsResolver } from "./GetChannelDetails";
import { GetChannelsResolver } from "./GetChannels";
import { UpdateChannelDescriptionResolver } from "./UpdateChannelDescription";

export default [
	CreateChannelResolver,
	GetChannelsResolver,
	ChannelFieldResolvers,
	AddUsersToChannelResolver,
	DeleteChannelResolver,
	UpdateChannelDescriptionResolver,
	GetChannelDetailsResolver
];
