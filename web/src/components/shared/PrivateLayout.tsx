import { Layout } from "antd";
import React, { Fragment } from "react";

import { PrimaryNav } from "../Navigation/PrimaryNav";
import { SecondaryNav } from "../Navigation/SecondaryNav";

export const PrivateLayout = (props: any) => {
	return (
		<Fragment>
			<Layout className="private-container">
				<Layout.Sider breakpoint="lg" width="270px" collapsedWidth="0px">
					<SecondaryNav />
				</Layout.Sider>
				<Layout.Content>{props.children}</Layout.Content>
			</Layout>
			<PrimaryNav />
		</Fragment>
	);
};
