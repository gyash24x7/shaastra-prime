import {
  BookFilled,
  BookOutlined,
  DollarCircleFilled,
  DollarCircleOutlined,
  HomeFilled,
  HomeOutlined,
  MessageFilled,
  MessageOutlined,
  NotificationFilled,
  NotificationOutlined,
  SettingFilled,
  SettingOutlined,
} from "@ant-design/icons";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const NavIcon = ({ name }: { name: string }) => {
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
	}

	const [hover, setHover] = useState(false);
	const { pathname } = useLocation();
	const isActive = pathname.split("/")[1] === name;

	return (
		<Link to={`/${name}`}>
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
		</Link>
	);
};
