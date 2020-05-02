import { PlusCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { stringGen } from "../../utils/lorem";

export const ChannelsMenu = () => {
	const { channelId } = useParams();
	const history = useHistory();

	return (
		<Fragment>
			<Menu>
				<Menu.ItemGroup title="Actions">
					<Menu.Item>
						<PlusCircleOutlined className="icon nav-icon" />
						<span>New Channel</span>
					</Menu.Item>
				</Menu.ItemGroup>
			</Menu>
			<Menu mode="inline" selectedKeys={[channelId!]}>
				<Menu.SubMenu title="Channels">
					{channels.map((channel) => (
						<Menu.Item
							key={channel.id}
							onClick={() => history.push(`/chat/${channel.id}`)}
						>
							<span>{channel.name}</span>
						</Menu.Item>
					))}
				</Menu.SubMenu>
			</Menu>
		</Fragment>
	);
};

const channels = [...Array(15)].map((_, id) => ({
	id,
	name: stringGen.generateWords(3)
}));
