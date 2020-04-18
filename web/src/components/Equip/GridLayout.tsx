import React from "react";
import StackGrid from "react-stack-grid";
import { useWindowSize } from "react-use";

import { KanbanItem } from "./KanbanLayout";

export const GridLayout = (props: any) => {
	const { width } = useWindowSize();
	const getColumnWidth = (width: number) => {
		if (width < 400) return width - 180;
		else if (width < 900) return (width - 180) / 2;
		else if (width < 1199) return (width - 180) / 3;
		else if (width < 1500) return (width - 450) / 2;
		else return (width - 450) / 3;
	};

	console.log(width);

	return (
		<div style={{ margin: "0px -10px" }}>
			<StackGrid
				columnWidth={getColumnWidth(width || 0)}
				gutterWidth={2}
				itemComponent="div"
				style={{ display: "flex" }}
			>
				{props.data.map((task: any, i: any) => (
					<KanbanItem task={task} key={i} />
				))}
			</StackGrid>
		</div>
	);
};
