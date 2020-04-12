import { Layout } from "antd";
import React, { Fragment } from "react";

import { PrimaryNav } from "../Navigation/PrimaryNav";
import { SecondaryNav } from "../Navigation/SecondaryNav";

export const PrivateLayout = (props: any) => {
	return (
		<Fragment>
			<Layout>
				<Layout.Content>{props.children}</Layout.Content>
			</Layout>
			<div className="nav-container">
				<PrimaryNav />
				<SecondaryNav />
			</div>
		</Fragment>
	);
};
