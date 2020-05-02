import { Button, Typography } from "antd";
import React, { Fragment } from "react";
import { SwitchingIcon } from "./SwitchingIcon";

interface CommonDrawerTitleProps {
	title: string;
	onClose: () => void;
	extra?: JSX.Element;
}

const { Title } = Typography;

export const CommonDrawerTitle = (props: CommonDrawerTitleProps) => {
	return (
		<Fragment>
			<div className="drawer-header">
				<Title level={4}>{props.title}</Title>
				<Button
					icon={<SwitchingIcon name="close" className="editor-icon" />}
					className="editor-btn"
					onClick={props.onClose}
				/>
			</div>
			{props.extra}
		</Fragment>
	);
};
