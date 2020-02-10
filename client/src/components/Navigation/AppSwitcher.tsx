import React, { Fragment, Dispatch, SetStateAction } from "react";
import { Link, Redirect } from "react-router-dom";
import { GlobalItem } from "@atlaskit/navigation-next";
import AppSwitcherIcon from "@atlaskit/icon/glyph/app-switcher";
import NotificationIcon from "@atlaskit/icon/glyph/notification";
import LogoutIcon from "@atlaskit/icon/glyph/sign-out";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import Spinner from "@atlaskit/spinner";
import { useLogoutMutation } from "../../generated";
import { ShowError } from "../Shared/ShowError";

interface AppSwitcherProps {
	setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const AppSwitcher = ({ setIsDrawerOpen }: AppSwitcherProps) => {
	const [logout, { data, loading, error }] = useLogoutMutation();

	if (error) return <ShowError />;

	if (data?.logout) return <Redirect to="/login" />;

	return (
		<Fragment>
			<Link to="/">
				<GlobalItem icon={AppSwitcherIcon} onClick={() => {}} />
			</Link>
			<GlobalItem
				icon={NotificationIcon}
				onClick={() => {
					setIsDrawerOpen(true);
				}}
			/>
			<GlobalItem icon={SettingsIcon} onClick={() => {}} />
			<GlobalItem
				icon={loading ? () => <Spinner invertColor={true} /> : LogoutIcon}
				onClick={() => logout()}
			/>
		</Fragment>
	);
};
