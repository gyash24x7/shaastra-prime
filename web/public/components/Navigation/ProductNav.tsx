import React, { Fragment } from "react";
import { HipchatIcon } from "@atlaskit/logo";
import { HeaderSection, Item, MenuSection } from "@atlaskit/navigation-next";
import { Link } from "react-router-dom";
import { getLogo } from "../Logos";

const Logo = getLogo( "#fff" );

export const ProductNav = () => (
	<Fragment>
		<HeaderSection>
			{ ( { className }: { className: string } ) => (
				<div className={ className } style={ { padding : "25px 30px 20px" } }>
					<Logo/>
				</div>
			) }
		</HeaderSection>
		<MenuSection>
			{ ( { className }: { className: string } ) => (
				<div className={ className }>
					<Link to="/chat">
						<Item
							text={ <span className="montserrat">Shaastra Chat</span> }
							before={ HipchatIcon }
						/>
					</Link>
				</div>
			) }
		</MenuSection>
	</Fragment>
);
