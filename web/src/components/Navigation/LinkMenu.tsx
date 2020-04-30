import {
	InboxOutlined,
	IssuesCloseOutlined,
	ProfileOutlined,
	TeamOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-use";

export const LinkMenu = () => {
	const { pathname } = useLocation();
	const history = useHistory();

	return (
		<Menu selectedKeys={[pathname!]}>
			<Menu.ItemGroup title="Links">
				<Menu.Item key="/">
					<ProfileOutlined className="icon nav-icon" />
					<span>Profile</span>
				</Menu.Item>
				<Menu.Item key="/team/Webops">
					<TeamOutlined className="icon nav-icon" />
					<span>My Team</span>
				</Menu.Item>
				<Menu.Item key="/issues">
					<IssuesCloseOutlined className="icon nav-icon" />
					<span>View Issues</span>
				</Menu.Item>
				<Menu.Item key="/updates" onClick={() => history.push("/updates")}>
					<InboxOutlined className="icon nav-icon" />
					<span>Updates</span>
				</Menu.Item>
			</Menu.ItemGroup>
		</Menu>
	);
};
