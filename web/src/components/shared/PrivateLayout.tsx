import { Layout } from "antd";
import React from "react";

import { PrimaryNav } from "./PrimaryNav";
import { SecondaryNav } from "./SecondaryNav";

export const PrivateLayout = (props: any) => {
	return (
		<Layout>
			<Layout.Sider breakpoint="md" width="300px">
				<div className="nav-container">
					<PrimaryNav />
					<SecondaryNav />
				</div>
			</Layout.Sider>
			<Layout.Content>{props.children}</Layout.Content>
		</Layout>
	);
};
