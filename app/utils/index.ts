export const getIconNameValue = (key: string) => {
	return ICON_MAP[key];
};

const ICON_MAP: Record<string, string> = {
	Home: "home",
	Equip: "book",
	Chat: "message",
	Finbooks: "dollar-circle"
};
