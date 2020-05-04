import { CreateChannelResolver } from "./CreateChannel";
import { ChannelFieldResolvers } from "./FieldResolvers";
import { GetChannelsResolver } from "./GetChannels";
export default [
	CreateChannelResolver,
	GetChannelsResolver,
	ChannelFieldResolvers
];
