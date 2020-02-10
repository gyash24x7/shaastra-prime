import React from "react";
import { ContainerHeader, ItemAvatar } from "@atlaskit/navigation-next";
import { useMeQuery } from "../../generated";
import { ShowError } from "../Shared/ShowError";
import { Loader } from "../Shared/Loader";

export const NavHeader = () => {
	const { data, error } = useMeQuery();

	if (error) return <ShowError />;
	if (data?.me?.id) {
		return (
			<div className="user-section">
				<ContainerHeader
					before={(itemState: any) => (
						<ItemAvatar itemState={itemState} size="large" />
					)}
					text={<strong className="user-details">{data.me.name}</strong>}
					subText={
						<strong className="user-details">
							{data.me.department.name} | {data.me.role}
						</strong>
					}
				/>
			</div>
		);
	}

	return <Loader />;
};
