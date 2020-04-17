import React from "react";

import LightLogo from "../../images/LightLogo.png";

export const PublicLayout = (props: any) => {
	return (
		<div className="wrapper">
			<div className="public-bg"></div>
			<div className="public-container">
				<div className="logo-container">
					<img src={LightLogo} alt="Shaastra Logo" />
				</div>
				{props.children}
			</div>
		</div>
	);
};
