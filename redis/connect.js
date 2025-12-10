import Redis from "ioredis";
import config from "../config/config.js";

const client = new Redis(config.REDIS_URL);

export default client;
