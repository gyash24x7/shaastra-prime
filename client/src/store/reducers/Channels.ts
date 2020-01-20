import { ChannelAction, Channel } from "../../typings";
import { channels as defaultChannels } from "../store";

export const ChannelsReducer = (
	channels = [] as Channel[],
	{ type }: ChannelAction
) => {
	switch (type) {
		default:
			return defaultChannels;
	}
};
