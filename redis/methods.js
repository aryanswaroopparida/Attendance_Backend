import redisClient from "./connect.js";

const cacheMethods = {
  get: async function (key) {
    try {
      return await redisClient.get(key);
    } catch (error) {
      console.error("Error in getRedisClient ", error);
    }
  },

  set: async function (key, data) {
    try {
      await redisClient.set(key, data);
    } catch (error) {
      console.error("Error in setRedisClient ", error);
    }
  },

  hset: async function (pkey, key, data) {
    try {
      await redisClient.hset(pkey, { [key]: data });
    } catch (error) {
      console.error("Error in hsetRedisClient ", error);
    }
  },

  hgetAll: async function (pkey) {
    try {
      return await redisClient.hgetall(pkey);
    } catch (error) {
      console.error("Error in hgetAllRedisClient ", error);
    }
  },

  hget: async function (pkey, key) {
    try {
      return await redisClient.hget(pkey, key);
    } catch (error) {
      console.error("Error in hget ", error);
    }
  },

  deleteKey: async function (key) {
    try {
      await redisClient.del([key]);
    } catch (error) {
      console.error("Error in deleteKeyRedisClient ", error);
    }
  },

  incr: async function (key) {
    try {
      await redisClient.incr(key);
    } catch (error) {
      console.error("Error in incr ", error);
    }
  },

  flushDB: async function(){
    try {
      await redisClient.flushdb();   // current DB only
    } catch (error) {
      console.error("Error in flushDB ",error);
    }
  }
};

export default cacheMethods;
