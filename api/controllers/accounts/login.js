var UserInfor = require('../../components/redis-store/UserInfor')
var UserToken = require('../../components/redis-store/UserToken')
var randomUtils = require('../../utils/random-utils')

module.exports = {
    inputs: {
        username: {
            type: 'string',
            required: true
        },
        password: {
            type: 'string',
            required: true
        },
    },
    exits: {
        success: {
            description: "Success",
            responseType: 'success'
        },
        error: {
            description: "Error",
            responseType: 'error'
        },
    },
    fn: async function (inputs, exits) {
        var { username, password } = inputs;
        var records = await UserInfor.get(username);
        records = records && JSON.parse(records);
        var token = null;
        if (records && records.password == password) {
            while (true) {
                token = randomUtils.uid(255)
                var result = await UserToken.creatWithExpireIn(token, JSON.stringify(records), sails.config.tokenLife);
                if (result !== 'fail') break;
            }
            this.req.options.userinfo = records;
            return exits.success({ 'access-token': token, expire: sails.config.tokenLife, userinfo: this.req.options.userinfo });
        }
        return exits.success({ 'em': 'Tài khoản hoặc mật khẩu không trùng khớp' });
    }
};
