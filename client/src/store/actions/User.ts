import { LoginActionData } from "../../typings";

export const getLoginAction = ( { rollNumber, password }: LoginActionData ) => (
	{
		type : "LOGIN",
		rollNumber,
		password
	}
);
