import { Empty } from "antd";
import React from "react";
import StackGrid from "react-stack-grid";
import { useWindowSize } from "react-use";
import { Task } from "../../generated";
import { RecursivePartial } from "../../generated/types";
import { Loader } from "../shared/Loader";
import { KanbanItem } from "./KanbanItem";

interface GridLayoutProps {
	data: RecursivePartial<Task>[];
	loading?: boolean;
}

export const GridLayout = (props: GridLayoutProps) => {
	const { width } = useWindowSize();
	const getColumnWidth = (width: number) => {
		if (width < 400) return width - 180;
		else if (width < 900) return (width - 180) / 2;
		else if (width < 1199) return (width - 180) / 3;
		else if (width < 1500) return (width - 450) / 2;
		else return (width - 450) / 3;
	};

	if (props.loading) {
		return <Loader />;
	}

	return (
		<div style={{ margin: "0px -10px" }}>
			<StackGrid
				columnWidth={getColumnWidth(width || 0)}
				gutterWidth={2}
				itemComponent="div"
				style={{ display: "flex" }}
			>
				{props.data.map((task) => (
					<KanbanItem task={task} key={task.id} />
				))}
			</StackGrid>
			{props.data.length === 0 && (
				<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
			)}
		</div>
	);
};
