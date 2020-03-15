import Modal, { ModalTransition } from "@atlaskit/modal-dialog";
import React from "react";

interface NewChannelProps {
	isOpen: boolean;
	toggleModal: () => void;
}

export const NewChannel = ({ isOpen, toggleModal }: NewChannelProps) => {
	const handleOnSubmit = () => {
		toggleModal();
	};

	const actions = [
		{ text: "Submit", onClick: handleOnSubmit },
		{ text: "Close", onClick: toggleModal }
	];

	return (
		<ModalTransition>
			{isOpen && (
				<Modal actions={actions} onClose={toggleModal} heading="New Channel">
					<div>This is modal</div>
				</Modal>
			)}
		</ModalTransition>
	);
};
