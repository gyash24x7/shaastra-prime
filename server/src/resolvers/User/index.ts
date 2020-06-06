import { CreateUserResolver } from "./CreateUser";
import { UserFieldResolvers } from "./FieldResolvers";
import { ForgotPasswordResolver } from "./ForgotPassword";
import { GetPasswordOTPResolver } from "./GetPasswordOTP";
import { GetUsersResolver } from "./GetUsers";
import { LoginResolver } from "./Login";
import { MeResolver } from "./Me";
import { SearchUserResolver } from "./SearchUser";
import { UploadCoverPicResolver } from "./UploadCoverPic";
import { UploadProfilePicResolver } from "./UploadProfilePic";
import { VerifyPasswordOTPResolver } from "./VerifyPasswordOTP";
import { VerifyUserResolver } from "./VerifyUser";

export default [
	CreateUserResolver,
	UserFieldResolvers,
	ForgotPasswordResolver,
	GetUsersResolver,
	LoginResolver,
	MeResolver,
	GetPasswordOTPResolver,
	VerifyPasswordOTPResolver,
	UploadCoverPicResolver,
	UploadProfilePicResolver,
	VerifyUserResolver,
	SearchUserResolver
];
