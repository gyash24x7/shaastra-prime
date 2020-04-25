import { Card, Layout, Typography } from "antd";
import React from "react";
import { PrimaryNav } from "../Navigation/PrimaryNav";
import { SecondaryNav } from "../Navigation/SecondaryNav";

const { Content, Sider } = Layout;
const { Title } = Typography;

interface PrivateLayoutProps {
	title: string;
	children: any;
	extra?: JSX.Element;
}

export const PrivateLayout = (props: PrivateLayoutProps) => {
	return (
		<div className="private-container">
			<Layout>
				<Sider breakpoint="xl" width="270" collapsedWidth="0">
					<SecondaryNav />
				</Sider>
				<Layout>
					<Content>
						<div className="screen-wrapper">
							<div className="grid-row">
								<Card className="title-card">
									<Title level={3}>{props.title}</Title>
								</Card>
							</div>
							{props.children}
						</div>
					</Content>
				</Layout>
			</Layout>
			<PrimaryNav />
		</div>
	);
};
