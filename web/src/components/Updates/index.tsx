import { Col, Row } from "antd";
import React from "react";

import { PrivateLayout } from "../shared/PrivateLayout";
import { UpdateItem } from "./UpdateItem";
import { UpdateList } from "./UpdateList";

export const UpdateScreen = () => {
	return (
		<PrivateLayout title="Updates">
			<div className="screen-wrapper">
				<Row className="update-container">
					<Col xl={15} lg={12}>
						<UpdateItem />
					</Col>
					<Col xl={9} lg={12}>
						<UpdateList />
					</Col>
				</Row>
			</div>
		</PrivateLayout>
	);
};
