import React from "react";
import { ContainerHeader, ItemAvatar } from "@atlaskit/navigation-next";

export const NavHeader = () => (
	<div className="user-section">
		<ContainerHeader
			before={(itemState: any) => (
				<ItemAvatar itemState={itemState} size="large" />
			)}
			text={<strong className="user-details">Yash Gupta</strong>}
			subText={<strong className="user-details">WEBOPS | CORE</strong>}
		/>
	</div>
);
