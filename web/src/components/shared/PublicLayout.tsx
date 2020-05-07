import { Col, Row } from "antd";
import React from "react";
import DarkLogo from "../../images/DarkLogo.png";
import LightLogo from "../../images/LightLogo.png";

export const PublicLayout = (props: any) => {
	return (
		<Row className="wrapper" align="middle" justify="end">
			<Col xs={24} md={15} lg={12} xl={9} xxl={8} className="public-container">
				<div className="logo-container">
					<img src={LightLogo} alt="Shaastra Logo" />
				</div>
				<div className="fixed-logo">
					<img src={DarkLogo} alt="Shaastra Logo" />
				</div>
				{props.children}
			</Col>
		</Row>
	);
};
