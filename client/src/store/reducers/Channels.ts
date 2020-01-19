import { ChannelAction } from "../../typings";
import { channels as defaultChannels } from "../store";

export const ChannelsReducer = (
	channels = defaultChannels,
	{ type }: ChannelAction
) => {
	switch (type) {
		default:
			return channels;
	}
};
