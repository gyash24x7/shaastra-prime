import React from "react";
import { Link, useLocation } from "react-router-dom";

export const LinkItem = ({ components: { Item }, to, ...props }: any) => {
	const location = useLocation();
	return (
		<Item
			{...props}
			component={({ children, className }: any) => (
				<Link to={to} className={className}>
					{children}
				</Link>
			)}
			isSelected={location.pathname === "/chat/channel/1"}
		/>
	);
};
