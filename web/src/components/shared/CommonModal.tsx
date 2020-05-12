import { Button, Modal, Typography } from "antd";
import React, { Fragment, useContext } from "react";
import { ModalContext, ModalPropsExtended } from "../../utils/context";
import { SwitchingIcon } from "./SwitchingIcon";

interface CommonModalProps {
	visible: boolean;
	component?: JSX.Element;
	onCancel: () => void;
	modalProps?: ModalPropsExtended;
}
const { Title } = Typography;

export const CommonModal = (props: CommonModalProps) => {
	const { toggleModal } = useContext(ModalContext)!;

	return (
		<Modal
			{...props.modalProps}
			visible={props.visible}
			onCancel={props.onCancel}
			centered
			closeIcon={<div />}
			width="50vw"
			style={{ ...props.modalProps?.style, minWidth: 600 }}
			footer={null}
			title={
				<Fragment>
					<div className="drawer-header">
						<Title level={4}>{props.modalProps?.title}</Title>
						<Button
							icon={<SwitchingIcon name="close" className="editor-icon" />}
							className="editor-btn"
							onClick={() => toggleModal()}
						/>
					</div>
					{props.modalProps?.extra}
				</Fragment>
			}
		>
			{props.component}
		</Modal>
	);
};
