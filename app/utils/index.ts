export const getIconNameValue = (key: string) => {
	return ICON_MAP[key];
};

const ICON_MAP: Record<string, string> = {
	Home: "home",
	Equip: "book",
	Chat: "message",
	Finbooks: "dollar-circle",
	Mobile: "phone",
	Email: "mail",
	UPI: "bank",
	"Roll Number": "number",
	Updates: "build",
	Details: "profile",
	Media: "file-image"
};
