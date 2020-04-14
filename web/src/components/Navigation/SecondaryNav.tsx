import {
  FileAddOutlined,
  InboxOutlined,
  IssuesCloseOutlined,
  PlusOutlined,
  ProfileOutlined,
  SubnodeOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";

import { AvatarHeader } from "../shared/AvatarHeader";

export const SecondaryNav = () => {
	const { pathname } = useLocation();
	const history = useHistory();
	const selectedKey = pathname.split("/")[1] || "profile";

	return (
		<Menu
			style={{ height: "100vh" }}
			selectedKeys={[selectedKey]}
			onClick={({ key }) => history.push(key)}
		>
			<Menu.ItemGroup className="avatar-item-group">
				<AvatarHeader />
			</Menu.ItemGroup>
			<Menu.Divider />
			<Menu.ItemGroup title="Quick Actions">
				<Menu.Item key="createTask">
					<PlusOutlined className="icon nav-icon" />
					<span>Create Task</span>
				</Menu.Item>
				<Menu.Item key="submitInvoice">
					<FileAddOutlined className="icon nav-icon" />
					<span>Submit Invoice</span>
				</Menu.Item>
				<Menu.Item key="sendUpdate">
					<SubnodeOutlined className="icon nav-icon" />
					<span>Send Update</span>
				</Menu.Item>
			</Menu.ItemGroup>
			<Menu.Divider />
			<Menu.ItemGroup title="Links">
				<Menu.Item key="profile">
					<ProfileOutlined className="icon nav-icon" />
					<span>Profile</span>
				</Menu.Item>
				<Menu.Item key="webops">
					<TeamOutlined className="icon nav-icon" />
					<span>My Team</span>
				</Menu.Item>
				<Menu.Item key="viewIssues">
					<IssuesCloseOutlined className="icon nav-icon" />
					View Issues
				</Menu.Item>
				<Menu.Item key="updates">
					<InboxOutlined className="icon nav-icon" />
					Updates
				</Menu.Item>
			</Menu.ItemGroup>
		</Menu>
	);
};
