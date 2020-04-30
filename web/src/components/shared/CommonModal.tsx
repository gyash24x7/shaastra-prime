import { Modal } from "antd";
import { ModalProps } from "antd/lib/modal";
import React from "react";

interface CommonModalProps {
	visible: boolean;
	component?: JSX.Element;
	onCancel: () => void;
	modalProps?: ModalProps;
}

export const CommonModal = (props: CommonModalProps) => {
	return (
		<Modal
			{...props.modalProps}
			visible={props.visible}
			onCancel={props.onCancel}
			centered
			closeIcon={<div />}
		>
			{props.component}
		</Modal>
	);
};
