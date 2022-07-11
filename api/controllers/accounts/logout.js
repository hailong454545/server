var UserToken = require('../../components/redis-store/UserToken')

module.exports = {
    inputs: {
    },
    fn: async function (inputs, exits) {
        var token = this.req.headers.authorization;
        await UserToken.del(token);
        return exits.success({});
    }
};
