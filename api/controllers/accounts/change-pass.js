var UserInfor = require('../../components/redis-store/UserInfor')

module.exports = {
    inputs: {
        oldPassword: {
            type: 'string',
            required: true,
        },
        newPassword: {
            type: 'string',
            required: true,
        },
        type: {
            type: 'string',
            required: true,
        },
    },
    fn: async function (inputs, exits) {
        var userinfo = this.req.options.userinfo;
        var { oldPassword, newPassword, type } = inputs;
        if (type == 'login') {
            if (oldPassword == userinfo.password) {
                userinfo.password == newPassword;
                await UserInfor.update(userinfo.username, JSON.stringify(userinfo));
            }
            else {
                return exits.success({ 'em': 'Mật khẩu cũ không đúng' })
            }
        }
        else {
            if (oldPassword == userinfo.passtrading) {
                userinfo.passtrading == newPassword;
                await UserInfor.update(userinfo.username, JSON.stringify(userinfo));
            }
            else {
                return exits.success({ 'em': 'Mật khẩu cũ không đúng' })
            }
        }
        return exits.success({})
    }
};
