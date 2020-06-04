import { Button, Result } from "antd";
import React from "react";

interface ShowErrorProps {
	status?: "500" | "403" | "404" | "success" | "error" | "info" | "warning";
	message?: string;
}

export const ShowError = ({ status, message }: ShowErrorProps) => {
	return (
		<Result
			title={message || "Internal Server Error"}
			status={status || "500"}
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
