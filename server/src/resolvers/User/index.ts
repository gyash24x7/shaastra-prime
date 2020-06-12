import { CreateUserResolver } from "./CreateUser";
import { ForgotPasswordResolver } from "./ForgotPassword";
import { GetPasswordOTPResolver } from "./GetPasswordOTP";
import { GetUsersResolver } from "./GetUsers";
import { LoginResolver } from "./Login";
import { MeResolver } from "./Me";
import { UploadCoverPicResolver } from "./UploadCoverPic";
import { UploadProfilePicResolver } from "./UploadProfilePic";
import { VerifyPasswordOTPResolver } from "./VerifyPasswordOTP";
import { VerifyUserResolver } from "./VerifyUser";

export default [
	CreateUserResolver,
	ForgotPasswordResolver,
	GetUsersResolver,
	LoginResolver,
	MeResolver,
	GetPasswordOTPResolver,
	VerifyPasswordOTPResolver,
	UploadCoverPicResolver,
	UploadProfilePicResolver,
	VerifyUserResolver
];
