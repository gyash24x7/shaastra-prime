import { Button, Result } from "antd";
import React from "react";
import { useHistory } from "react-router-dom";

export const ShowError = () => {
	const history = useHistory();
	return (
		<Result
			title="Internal Server Error"
			status="500"
			extra={
				<Button className="button danger" onClick={() => history.push("/")}>
					Go to Home
				</Button>
			}
		/>
	);
};
