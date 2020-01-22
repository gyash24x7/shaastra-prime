import React from "react";
import { ContainerHeader, ItemAvatar } from "@atlaskit/navigation-next";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../store/selectors/User";

export const NavHeader = () => {

	const user = useSelector( selectCurrentUser );

	return (
		<div className="user-section">
			<ContainerHeader
				before={ ( itemState: any ) => (
					<ItemAvatar itemState={ itemState } size="large"/>
				) }
				text={ <strong className="user-details">{ user.name }</strong> }
				subText={ <strong className="user-details">
					{ user.department } | { user.accessLevel }
				</strong> }
			/>
		</div>
	);
};
