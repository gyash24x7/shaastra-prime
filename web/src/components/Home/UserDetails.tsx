import { Col, Row, Typography } from "antd";
import React, { Fragment } from "react";

export const UserDetails = () => {
	return (
		<Fragment>
			<Row className="user-details-row">
				<Col>
					<Typography.Paragraph>About</Typography.Paragraph>
					<Typography.Title level={4}>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officia,
						illum, dolorem culpa molestiae in aut inventore soluta!
					</Typography.Title>
				</Col>
			</Row>
			<br />
			<Row className="user-details-row">
				<Col lg={12}>
					<Typography.Paragraph>Email</Typography.Paragraph>
					<Typography.Title level={4}>blah24x7@blah.co</Typography.Title>
				</Col>
				<Col lg={12}>
					<Typography.Paragraph>Roll Number</Typography.Paragraph>
					<Typography.Title level={4}>CH16B025</Typography.Title>
				</Col>
			</Row>
			<br />
			<Row className="user-details-row">
				<Col lg={12}>
					<Typography.Paragraph>Mobile</Typography.Paragraph>
					<Typography.Title level={4}>9999999999</Typography.Title>
				</Col>
				<Col lg={12}>
					<Typography.Paragraph>Upi</Typography.Paragraph>
					<Typography.Title level={4}>abcd123@okbank</Typography.Title>
				</Col>
			</Row>
		</Fragment>
	);
};
