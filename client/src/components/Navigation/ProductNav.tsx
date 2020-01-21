import React, { Fragment } from "react";
import { AtlassianWordmark, HipchatIcon } from "@atlaskit/logo";
import {
	HeaderSection,
	Item,
	MenuSection,
	Wordmark
} from "@atlaskit/navigation-next";
import { Link } from "react-router-dom";

export const ProductNav = () => (
	<Fragment>
		<HeaderSection>
			{ ( { className }: { className: string } ) => (
				<div className={ className }>
					<Wordmark wordmark={ AtlassianWordmark }/>
				</div>
			) }
		</HeaderSection>
		<MenuSection>
			{ ( { className }: { className: string } ) => (
				<div className={ className }>
					<Link to="/chat">
						<Item text={ <span className="montserrat">Shaastra Chat</span> }
						      before={ HipchatIcon }/>
					</Link>
				</div>
			) }
		</MenuSection>
	</Fragment>
);
