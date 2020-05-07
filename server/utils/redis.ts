import dotenv from "dotenv";
import Redis from "ioredis";
dotenv.config();
export const redis = new Redis(
	process.env.NODE_ENV === "development"
		? process.env.DEV_REDIS_URL
		: process.env.PROD_REDIS_URL
);
