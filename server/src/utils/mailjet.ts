import dotenv from "dotenv";
import mailjet from "node-mailjet";

dotenv.config();

export default mailjet.connect(
	process.env.MAILJET_APIKEY!,
	process.env.MAILJET_APISECRET!
);
