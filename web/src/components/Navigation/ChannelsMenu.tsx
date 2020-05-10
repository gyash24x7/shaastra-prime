import { PlusCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { Fragment } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetChannelsQuery } from "../../generated";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";

export const ChannelsMenu = () => {
	const { channelId } = useParams();
	const history = useHistory();

	const { data, error } = useGetChannelsQuery();

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	if (data) {
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
						{data.getChannels.map((channel) => (
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
	}

	return <Loader />;
};
