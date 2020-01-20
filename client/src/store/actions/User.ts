export interface LoginActionData {
	rollNumber: string;
	password: string;
}

export const getLoginAction = ({ rollNumber, password }: LoginActionData) => ({
	type: "LOGIN",
	rollNumber,
	password
});
