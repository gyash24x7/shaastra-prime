import {
	FileAddOutlined,
	PlusOutlined,
	SubnodeOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useContext } from "react";
import { ModalContext } from "../../utils/context";
import { CommonDrawerTitle } from "../shared/CommonDrawerTitle";
import { UpdateForm } from "../Updates/UpdateForm";

export const QuickActions = () => {
	const { setModalComponent, setModalProps } = useContext(ModalContext)!;

	return (
		<Menu>
			<Menu.ItemGroup title="Quick Actions">
				<Menu.Item key="createTask">
					<PlusOutlined className="icon nav-icon" />
					<span>Create Task</span>
				</Menu.Item>
				<Menu.Item key="submitInvoice">
					<FileAddOutlined className="icon nav-icon" />
					<span>Submit Invoice</span>
				</Menu.Item>
				<Menu.Item
					key="sendUpdate"
					onClick={() => {
						setModalComponent(<UpdateForm />);
						setModalProps({
							title: (
								<CommonDrawerTitle
									title="Send New Update"
									onClose={() => setModalComponent(undefined)}
								/>
							),
							width: "50vw",
							style: { minWidth: 600 },
							footer: null
						});
					}}
				>
					<SubnodeOutlined className="icon nav-icon" />
					<span>Send Update</span>
				</Menu.Item>
			</Menu.ItemGroup>
			<Menu.Divider />
		</Menu>
	);
};
