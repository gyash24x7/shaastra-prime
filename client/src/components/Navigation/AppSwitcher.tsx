import React, { Fragment, Dispatch, SetStateAction, useState } from "react";
import { useObserver } from "mobx-react-lite";
import { Link, useHistory } from "react-router-dom";
import { GlobalItem } from "@atlaskit/navigation-next";
import AppSwitcherIcon from "@atlaskit/icon/glyph/app-switcher";
import NotificationIcon from "@atlaskit/icon/glyph/notification";
import LogoutIcon from "@atlaskit/icon/glyph/sign-out";
import SettingsIcon from "@atlaskit/icon/glyph/settings";
import { useUserStore } from "../../store";
import Spinner from "@atlaskit/spinner";

interface AppSwitcherProps {
	setIsDrawerOpen: Dispatch<SetStateAction<boolean>>;
}

export const AppSwitcher = ({ setIsDrawerOpen }: AppSwitcherProps) =>
	useObserver(() => {
		const { logout } = useUserStore();
		const history = useHistory();
		const [loading, setLoading] = useState(false);

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
					onClick={() => {
						setLoading(true);
						logout();
					}}
				/>
			</Fragment>
		);
	});
