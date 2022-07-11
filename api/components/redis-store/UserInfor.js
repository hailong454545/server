const Redis = require("ioredis");
const TableName = 'USERINFO'
var redisClient = null;

module.exports = {
    init: () => {
        if (!redisClient) redisClient = new Redis(sails.config.redisToken);
    },
    get: async (key) => {
        var result = await redisClient.get(TableName + ':' + key);
        return result;
    },
    creat: async (key, value) => {
        var exit = await redisClient.exists(TableName + ':' + key)
        if (exit) {
            return 'fail'
        }
        var result = await redisClient.set(TableName + ':' + key, value);
        return 'success';
    },
    update: async (key, value) => {
        var result = await redisClient.set(TableName + ':' + key, value);
        return result;
    },
    creatWithExpireIn: async (key, value, ExpireIn) => {
        await redisClient.set(TableName + ':' + key, value);
        await redisClient.expire(TableName + ':' + key, ExpireIn);
    },
    exit: async (key) => {
        return await redisClient.exists(TableName + ':' + key)
    },
    del: async (key) => {
        return await redisClient.del(TableName + ':' + key)
    },
}