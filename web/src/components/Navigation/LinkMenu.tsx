import {
	InboxOutlined,
	ProfileOutlined,
	TeamOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-use";
import { UserRole } from "../../generated";
import { UserContext } from "../../utils/context";

export const LinkMenu = () => {
	const { pathname } = useLocation();
	const history = useHistory();
	const { user } = useContext(UserContext)!;

	return (
		<Menu selectedKeys={[pathname!]}>
			<Menu.ItemGroup title="Links">
				<Menu.Item key="/" onClick={() => history.push("/")}>
					<ProfileOutlined className="icon nav-icon" />
					<span>Profile</span>
				</Menu.Item>
				<Menu.Item key="/team" onClick={() => history.push("/team")}>
					<TeamOutlined className="icon nav-icon" />
					<span>Team Shaastra</span>
				</Menu.Item>
				{/* <Menu.Item key="/issues">
					<IssuesCloseOutlined className="icon nav-icon" />
					<span>View Issues</span>
				</Menu.Item> */}
				{user.role === UserRole.Core && (
					<Menu.Item key="/updates" onClick={() => history.push("/updates")}>
						<InboxOutlined className="icon nav-icon" />
						<span>Updates</span>
					</Menu.Item>
				)}
			</Menu.ItemGroup>
		</Menu>
	);
};
