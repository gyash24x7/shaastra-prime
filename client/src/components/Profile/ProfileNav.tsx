import React from "react";
import { AtlassianWordmark, HipchatIcon } from "@atlaskit/logo";
import { LinkItem } from "../Navigation/LinkItem";

export const ProfileNav = {
	id : "switcher",
	type : "product",
	getItems : () => [
		{
			type : "HeaderSection",
			id : "header",
			items : [
				{
					type : "Wordmark",
					wordmark : AtlassianWordmark,
					id : "wordmark"
				}
			]
		},
		{
			type : "MenuSection",
			id : "menu",
			items : [
				{
					type : "InlineComponent",
					id : "chat",
					before : HipchatIcon,
					text : <div className="montserrat">Shaastra Chat</div>,
					to : "/chat",
					component : LinkItem
				}
			]
		}
	]
};
