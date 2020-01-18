import { initialStore } from "../store";
import { ChannelAction } from "../../typings";

export const ChannelsReducer = (
	state = initialStore,
	{ type, ...rest }: ChannelAction
) => {
	switch (type) {
		case "ADD_CHANNEL":
			return { ...state, channels: state.channels.concat(rest) };
		default:
			return state;
	}
};
