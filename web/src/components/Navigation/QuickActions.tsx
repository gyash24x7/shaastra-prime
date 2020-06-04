import { PlusOutlined, SubnodeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import React, { useContext } from "react";
import { UserRole } from "../../generated";
import { ModalContext, UserContext } from "../../utils/context";
import { CreateTaskForm } from "../Equip/CreateTaskForm";
import { UpdateForm } from "../Updates/UpdateForm";

export const QuickActions = () => {
	const { toggleModal } = useContext(ModalContext)!;
	const { user } = useContext(UserContext)!;

	return (
		<Menu>
			<Menu.ItemGroup title="Quick Actions">
				<Menu.Item
					key="createTask"
					onClick={() =>
						toggleModal({
							component: <CreateTaskForm />,
							props: { title: "Create New Requirement" }
						})
					}
				>
					<PlusOutlined className="icon nav-icon" />
					<span>Create Task</span>
				</Menu.Item>
				{/* <Menu.Item key="submitInvoice">
					<FileAddOutlined className="icon nav-icon" />
					<span>Submit Invoice</span>
				</Menu.Item> */}
				{user.role === UserRole.Core && (
					<Menu.Item
						key="sendUpdate"
						onClick={() =>
							toggleModal({
								component: <UpdateForm />,
								props: { title: "Send New Update" }
							})
						}
					>
						<SubnodeOutlined className="icon nav-icon" />
						<span>Send Update</span>
					</Menu.Item>
				)}
			</Menu.ItemGroup>
			<Menu.Divider />
		</Menu>
	);
};
