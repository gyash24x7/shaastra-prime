import React from "react";
import { PrivateLayout } from "../shared/PrivateLayout";
import { UpdateItem } from "./UpdateItem";

export const UpdateScreen = () => {
	return (
		<PrivateLayout title="Updates">
			{[...Array(10)].map((_, i) => (
				<UpdateItem key={i} />
			))}
		</PrivateLayout>
	);
};
