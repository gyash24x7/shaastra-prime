import { Col, Row } from "antd";
import React, { ReactChild, ReactChildren } from "react";
import DarkLogo from "../../images/DarkLogo.png";
import LightLogo from "../../images/LightLogo.png";

interface LayoutProps {
	children: ReactChild | ReactChildren;
}

export const PublicLayout = (props: LayoutProps) => {
	return (
		<Row className="wrapper" align="middle" justify="end">
			<Col span={9} className="public-container">
				<div className="logo-container">
					<img src={LightLogo} alt="Shaastra Logo" />
				</div>
				{props.children}
			</Col>
			<div className="fixed-logo">
				<img src={DarkLogo} alt="Shaastra Logo" />
			</div>
		</Row>
	);
};
