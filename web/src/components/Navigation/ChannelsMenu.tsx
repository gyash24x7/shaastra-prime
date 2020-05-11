import { PlusCircleOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { Fragment, useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useGetChannelsQuery } from "../../generated";
import { ModalContext } from "../../utils/context";
import { CreateChannel } from "../Chat/CreateChannel";
import { CommonDrawerTitle } from "../shared/CommonDrawerTitle";
import { Loader } from "../shared/Loader";
import { ShowError } from "../shared/ShowError";

export const ChannelsMenu = () => {
	const { channelId } = useParams();
	const history = useHistory();
	const { setModalComponent, setModalProps } = useContext(ModalContext)!;

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
						<Menu.Item
							onClick={() => {
								setModalProps({
									title: (
										<CommonDrawerTitle
											title="Create New Channel"
											onClose={() => setModalComponent(undefined)}
										/>
									),
									footer: null
								});
								setModalComponent(<CreateChannel />);
							}}
						>
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
