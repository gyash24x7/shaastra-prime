import { Col, Row } from "antd";
import React from "react";

import LightLogo from "../../images/LightLogo.png";

export const PublicLayout = (props: any) => {
	return (
		<Row className="wrapper">
			<Col className="public-bg" sm={12} lg={16} xxl={18}></Col>
			<Col className="public-container" sm={12} lg={8} xxl={6}>
				<div className="logo-container">
					<img src={LightLogo} alt="Shaastra Logo" />
				</div>
				{props.children}
			</Col>
		</Row>
	);
};
