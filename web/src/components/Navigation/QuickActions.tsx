import {
	FileAddOutlined,
	PlusOutlined,
	SubnodeOutlined
} from "@ant-design/icons";
import { Menu, Typography } from "antd";
import React, { useContext } from "react";
import { ModalContext } from "../../utils/context";
import { UpdateForm } from "../Updates/UpdateForm";

export const QuickActions = () => {
	const { setModalComponent, setModalProps } = useContext(ModalContext)!;
	const { Title } = Typography;

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
							title: <Title level={4}>Send New Update</Title>,
							width: "50vw",
							style: { minWidth: 600 }
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
