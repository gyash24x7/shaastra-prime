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

export const ChatNav = () => (
	<Fragment>
		<NavHeader/>
		<MenuSection>
			{ ( { className }: { className: string } ) => (
				<div className={ className }>
					<GroupHeading>Channels</GroupHeading>
					<Item before={ GroupIcon } text={ <span>Core Team</span> }/>
					<Separator/>
				</div>
			) }
		</MenuSection>
	</Fragment>
);
