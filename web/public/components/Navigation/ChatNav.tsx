import AddIcon from "@atlaskit/icon/glyph/add";
import GroupIcon from "@atlaskit/icon/glyph/people-group";
import {
  GroupHeading,
  Item,
  MenuSection,
  Separator
} from "@atlaskit/navigation-next";
import { Fragment } from "react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { NewChannel } from "../Chat/NewChannel";
import { NavHeader } from "./NavHeader";

export const ChatNav = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);
	const toggleModal = () => setIsOpen(!isOpen);

	return (
		<Fragment>
			<NavHeader />
			<MenuSection>
				{({ className }: { className: string }) => (
					<div className={className}>
						<Separator />
						<Item
							before={AddIcon}
							text={<span className="montserrat">New Channel</span>}
							onClick={toggleModal}
						/>
						<GroupHeading>Channels</GroupHeading>
						<Link to="/chat/channel/1">
							<Item
								before={GroupIcon}
								text={<span className="montserrat">Core Team</span>}
								isSelected={location.pathname === "/chat/channel/1"}
							/>
						</Link>
						<Separator />
					</div>
				)}
			</MenuSection>
			<NewChannel isOpen={isOpen} toggleModal={toggleModal} />
		</Fragment>
	);
};
