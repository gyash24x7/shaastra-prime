import {
  BookFilled,
  BookOutlined,
  DollarCircleFilled,
  DollarCircleOutlined,
  EditFilled,
  EditOutlined,
  HomeFilled,
  HomeOutlined,
  LogoutOutlined,
  MessageFilled,
  MessageOutlined,
  NotificationFilled,
  NotificationOutlined,
  SendOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";

interface SwitchingIconProps {
	name: string;
	isActive?: boolean;
	className?: string;
}

export const SwitchingIcon = ({
	name,
	isActive = false,
	className = ""
}: SwitchingIconProps) => {
	let OutlinedIcon = HomeOutlined;
	let FilledIcon = HomeFilled;
	switch (name) {
		case "equip":
			OutlinedIcon = BookOutlined;
			FilledIcon = BookFilled;
			break;

		case "edit":
			OutlinedIcon = EditOutlined;
			FilledIcon = EditFilled;
			break;

		case "send":
			OutlinedIcon = SendOutlined;
			FilledIcon = SendOutlined;
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

	return (
		<div
			className={className}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{hover || isActive ? (
				<FilledIcon className="icon" />
			) : (
				<OutlinedIcon className="icon" />
			)}
		</div>
	);
};
