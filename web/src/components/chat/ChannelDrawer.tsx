import {
  PicCenterOutlined,
  SettingOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Drawer, Menu } from "antd";
import React from "react";

import { stringGen } from "../../utils/lorem";

const { SubMenu, Item } = Menu;

export const ChannelDrawer = (props: any) => {
	return (
		<Drawer
			visible={props.visible}
			closable
			onClose={() => props.setVisible(false)}
		>
			<Menu
				mode="inline"
				openKeys={["sub1"]}
				onOpenChange={() => {}}
				style={{ width: 350 }}
			>
				<Item></Item>
				<SubMenu
					key="sub1"
					title={
						<span>
							<TeamOutlined className="nav-icon icon" />
							<span>Members</span>
						</span>
					}
				>
					{[...Array(25)].map((_, i) => (
						<Item key={i}>{stringGen.generateWords(2)}</Item>
					))}
				</SubMenu>
				<SubMenu
					key="sub2"
					title={
						<span>
							<PicCenterOutlined className="nav-icon icon" />
							<span></span>
						</span>
					}
				>
					<Item key="5">Option 5</Item>
					<Item key="6">Option 6</Item>
				</SubMenu>
				<SubMenu
					key="sub4"
					title={
						<span>
							<SettingOutlined className="nav-icon icon" />
							<span>Navigation Three</span>
						</span>
					}
				>
					<Item key="9">Option 9</Item>
					<Item key="10">Option 10</Item>
					<Item key="11">Option 11</Item>
					<Item key="12">Option 12</Item>
				</SubMenu>
			</Menu>
		</Drawer>
	);
};
