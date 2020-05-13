import mailjet from "node-mailjet";

export default mailjet.connect(
	process.env.MAILJET_APIKEY!,
	process.env.MAILJET_APISECRET!
);
