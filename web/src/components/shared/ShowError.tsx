import { Button, Result } from "antd";
import React from "react";

export const ShowError = () => {
	return (
		<Result
			title="Internal Server Error"
			status="500"
			extra={
				<Button
					className="button danger"
					onClick={() => (window.location.pathname = "/")}
				>
					Go to Home
				</Button>
			}
		/>
	);
};
