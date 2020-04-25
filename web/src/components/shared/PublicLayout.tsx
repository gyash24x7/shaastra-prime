import { Card } from "antd";
import React from "react";
import LightLogo from "../../images/LightLogo.png";

export const PublicLayout = (props: any) => {
	return (
		<div className="wrapper">
			<Card className="public-container">
				<div className="logo-container">
					<img src={LightLogo} alt="Shaastra Logo" />
				</div>
				{props.children}
			</Card>
		</div>
	);
};
