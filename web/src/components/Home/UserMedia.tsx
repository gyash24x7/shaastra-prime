import React from "react";

export const UserMedia = () => {
	return (
		<div className="user-media-container">
			{[...Array(60)].map((_, i) => (
				<div className="user-media-element" key={i}></div>
			))}
		</div>
	);
};
