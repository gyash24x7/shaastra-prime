import { CreateUserResolver } from "./CreateUser";
import { UserFieldResolvers } from "./FieldResolvers";
import { ForgotPasswordResolver } from "./ForgotPassword";
import { GetUsersResolver } from "./GetUsers";
import { LoginResolver } from "./Login";
import { MeResolver } from "./Me";
import { SearchUserResolver } from "./SearchUser";
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
	MeResolver,
	SendPasswordOTPResolver,
	UploadCoverPicResolver,
	UploadProfilePicResolver,
	VerifyUserResolver,
	SearchUserResolver
];
