import { Col, Row } from "antd";
import React from "react";

import { PrivateLayout } from "../shared/PrivateLayout";
import { ProfileCard } from "./ProfileCard";
import { UserDataCard } from "./UserDataCard";

export const HomeScreen = () => {
	return (
		<PrivateLayout>
			<div className="screen-wrapper">
				<div className="cover-pic" />
				<Row>
					<Col lg={12} xl={15} xxl={17}>
						<UserDataCard />
					</Col>
					<Col lg={12} xl={9} xxl={7}>
						<ProfileCard />
					</Col>
				</Row>
			</div>
		</PrivateLayout>
	);
};
