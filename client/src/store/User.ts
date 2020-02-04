import { observable, action, computed } from "mobx";
import { User, UserCreateInput } from "../typings";
import { client } from "../services";
export class UserStore {
	@observable user: User = {} as User;

	constructor(currentUser?: User) {
		if (currentUser) this.user = currentUser;
		else this.loadUser();
	}

	@computed get isAuthenticated() {
		return !!this.user?.id;
	}

	@action login = async (rollNumber: string, password: string) => {};

	@action loadUser = async () => {
		try {
			const { user } = await client.reAuthenticate();
			this.user = user;
			localStorage.setItem("currentUser", JSON.stringify(user));
		} catch (error) {
			console.log(error);
		}
	};

	@action createUser = async (data: UserCreateInput) => {
		const user = await client.service("users").create(data);
		const { accessToken } = await client.authenticate({
			strategy: "local",
			rollNumber: user.rollNumber,
			password: data.password
		});
		await client.authentication.setAccessToken(accessToken);
		localStorage.setItem("currentUser", JSON.stringify(user));
		this.user = user;
	};

	@action logout = async () => {
		await client.authentication.logout();
		localStorage.clear();
		this.user = {} as User;
	};
}
