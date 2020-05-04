import { CreateUserResolver } from "./CreateUser";
import { UserFieldResolvers } from "./FieldResolvers";
import { ForgotPasswordResolver } from "./ForgotPassword";
import { GetUsersResolver } from "./getUsers";
import { LoginResolver } from "./Login";
import { logoutResolver } from "./Logout";
import { MeResolver } from "./Me";
import { SendPasswordOTPResolver } from "./SendPasswordOTP";
import { UploadCoverPicResolver } from "./UploadCoverPic";
import { UploadProfilePicResolver } from "./UploadProfilePic";
import { VerifyUserResolver } from "./VerifyUser";

export default [
	CreateUserResolver,
	UserFieldResolvers,
	ForgotPasswordResolver,
	GetUsersResolver,
	LoginResolver,
	logoutResolver,
	MeResolver,
	SendPasswordOTPResolver,
	UploadCoverPicResolver,
	UploadProfilePicResolver,
	VerifyUserResolver
];
