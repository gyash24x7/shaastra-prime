import * as React from "react";
import { Fragment } from "react";
import {
	GroupHeading,
	Item,
	MenuSection,
	Separator
} from "@atlaskit/navigation-next";
import GroupIcon from "@atlaskit/icon/glyph/people-group";
import { NavHeader } from "./NavHeader";
import { Link, useLocation } from "react-router-dom";

export const ChatNav = () => {

	const location = useLocation();

	return (
		<Fragment>
			<NavHeader/>
			<MenuSection>
				{ ( { className }: { className: string } ) => (
					<div className={ className }>
						<Separator/>
						<GroupHeading>Channels</GroupHeading>
						<Link to="/chat/channel/1">
							<Item
								before={ GroupIcon }
								text={ <span className="montserrat">Core Team</span> }
								isSelected={ location.pathname === "/chat/channel/1" }
							/>
						</Link>
						<Separator/>
					</div>
				) }
			</MenuSection>
		</Fragment>
	);
};
