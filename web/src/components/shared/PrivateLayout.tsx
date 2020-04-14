import { ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, PageHeader } from "antd";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import { PrimaryNav } from "../Navigation/PrimaryNav";
import { SecondaryNav } from "../Navigation/SecondaryNav";

export const PrivateLayout = (props: any) => {
	const [marginLeft, setMarginLeft] = useState(270);
	const history = useHistory();

	return (
		<Fragment>
			<Layout className="private-container">
				<Layout.Sider
					breakpoint="lg"
					width="270px"
					collapsedWidth="0px"
					onBreakpoint={() => {
						if (window.innerWidth < 992) {
							setMarginLeft(0);
						} else setMarginLeft(270);
					}}
				>
					<SecondaryNav />
				</Layout.Sider>
				<Layout style={{ marginLeft }}>
					<Layout.Header>
						<div>
							<PageHeader
								title={props.title}
								onBack={() => history.goBack()}
								backIcon={<ArrowLeftOutlined className="icon" />}
							/>
						</div>
					</Layout.Header>
					<Layout.Content>{props.children}</Layout.Content>
				</Layout>
			</Layout>
			<PrimaryNav />
		</Fragment>
	);
};
