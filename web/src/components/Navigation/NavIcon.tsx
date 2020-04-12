import {
  BookFilled,
  BookOutlined,
  DollarCircleFilled,
  DollarCircleOutlined,
  HomeFilled,
  HomeOutlined,
  LogoutOutlined,
  MessageFilled,
  MessageOutlined,
  NotificationFilled,
  NotificationOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";
import React, { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavIconProps {
	name: string;
	linkDisabled?: boolean;
	onClick?: () => void;
}

export const NavIcon = ({ name, linkDisabled }: NavIconProps) => {
	let OutlinedIcon = HomeOutlined;
	let FilledIcon = HomeFilled;
	switch (name) {
		case "equip":
			OutlinedIcon = BookOutlined;
			FilledIcon = BookFilled;
			break;

		case "finbooks":
			OutlinedIcon = DollarCircleOutlined;
			FilledIcon = DollarCircleFilled;
			break;

		case "chat":
			OutlinedIcon = MessageOutlined;
			FilledIcon = MessageFilled;
			break;

		case "settings":
			OutlinedIcon = SettingOutlined;
			FilledIcon = SettingFilled;
			break;

		case "notification":
			OutlinedIcon = NotificationOutlined;
			FilledIcon = NotificationFilled;
			break;

		case "logout":
			OutlinedIcon = LogoutOutlined;
			FilledIcon = LogoutOutlined;
			break;
	}

	const [hover, setHover] = useState(false);
	const { pathname } = useLocation();
	const isActive = pathname.split("/")[1] === name;
	const WrapperComponent = linkDisabled ? Fragment : Link;

	return (
		<WrapperComponent to={`/${name}`}>
			<div
				className="app-icon"
				onMouseEnter={() => setHover(true)}
				onMouseLeave={() => setHover(false)}
			>
				{hover || isActive ? (
					<FilledIcon className="icon" />
				) : (
					<OutlinedIcon className="icon" />
				)}
			</div>
		</WrapperComponent>
	);
};
