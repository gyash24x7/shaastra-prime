import React from "react";

interface DrawerContext {
	component?: JSX.Element;
	visible: boolean;
	onClose?: () => void;
}

export const EquipDrawerContext = React.createContext<DrawerContext>({
	visible: false
});
