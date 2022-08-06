module.exports = {
    port: 3003,
    tokenLife: 360000,
    datastores: {
        default:
        {
            url: 'postgresql://postgres:postgres@127.0.0.1:5432/postgres',
        }
    },
    redisUser: {
        host: '127.0.0.1',
        port: 6379,
        db: 2,
    },
    redisToken: {
        host: '127.0.0.1',
        port: 6379,
        db: 1,
    }
}