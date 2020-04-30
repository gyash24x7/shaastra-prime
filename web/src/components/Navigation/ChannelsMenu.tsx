import { PlusCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useHistory, useParams } from "react-router-dom";

export const ChannelsMenu = () => {
	const { channelId } = useParams();
	const history = useHistory();
	console.log(channelId);

	return (
		<Menu selectedKeys={[channelId!]}>
			<Menu.ItemGroup title="Actions">
				<Menu.Item>
					<PlusCircleOutlined className="icon nav-icon" />
					<span>New Channel</span>
				</Menu.Item>
			</Menu.ItemGroup>
			<Menu.ItemGroup title="Channels">
				{channels.map((channel) => (
					<Menu.Item
						key={channel.id}
						onClick={() => history.push(`/chat/${channel.id}`)}
					>
						<span>{channel.name}</span>
					</Menu.Item>
				))}
			</Menu.ItemGroup>
		</Menu>
	);
};

const channels = [
	{
		id: "lnvkjfsnv",
		name: "House of Lords"
	}
];
