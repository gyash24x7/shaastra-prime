import { ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, PageHeader } from "antd";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";

import { PrimaryNav } from "../Navigation/PrimaryNav";
import { SecondaryNav } from "../Navigation/SecondaryNav";

const { Content, Sider, Header } = Layout;

export const PrivateLayout = (props: any) => {
	const [marginLeft, setMarginLeft] = useState(270);
	const history = useHistory();

	return (
		<Fragment>
			<Layout className="private-container">
				<Sider
					breakpoint="xl"
					width="270px"
					collapsedWidth="0px"
					onBreakpoint={() => {
						if (window.innerWidth < 1199) {
							setMarginLeft(0);
						} else setMarginLeft(270);
					}}
				>
					<SecondaryNav />
				</Sider>
				<Layout>
					<Layout style={{ marginLeft }}>
						<Header
							className="page-header"
							style={{
								width: marginLeft ? "calc(100% - 330px)" : "calc(100% - 60px)"
							}}
						>
							<PageHeader
								title={props.title}
								onBack={() => history.goBack()}
								backIcon={<ArrowLeftOutlined className="icon" />}
								extra={props.extra}
							/>
						</Header>
						<Content style={{ marginTop: 64 }}>{props.children}</Content>
					</Layout>
				</Layout>
			</Layout>
			<PrimaryNav />
		</Fragment>
	);
};
