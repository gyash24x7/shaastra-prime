import "./styles.scss";

import React from "react";

import { PrivateLayout } from "../shared/PrivateLayout";
import { UpdateItem } from "./UpdateItem";

export const UpdateScreen = () => {
	return (
		<PrivateLayout title="Updates">
			<div className="screen-wrapper">
				{[...Array(10)].map((_, i) => (
					<UpdateItem key={i} />
				))}
			</div>
		</PrivateLayout>
	);
};
