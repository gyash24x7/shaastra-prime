import { AddUserToChannelResolver } from "./AddUserToChannel";
import { CreateChannelResolver } from "./CreateChannel";
import { DeleteChannelResolver } from "./DeleteChannel";
import { ChannelFieldResolvers } from "./FieldResolvers";
import { GetChannelsResolver } from "./GetChannels";
import { UpdateChannelResolver } from "./UpdateChannel";

export default [
	CreateChannelResolver,
	GetChannelsResolver,
	ChannelFieldResolvers,
	AddUserToChannelResolver,
	DeleteChannelResolver,
	UpdateChannelResolver
];
