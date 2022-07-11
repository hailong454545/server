var UserInfor = require('../../components/redis-store/UserInfor')

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
        repassword: {
            type: 'string',
            required: true
        },
        passtrading: {
            type: 'string',
            required: true
        },
        repasstrading: {
            type: 'string',
            required: true
        },
        fullname: {
            type: 'string',
            required: true
        },
        phone: {
            type: 'string',
            required: true
        },
        email: {
            type: 'string',
            required: true
        }
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
        var { password, repassword, passtrading, repasstrading } = inputs;
        if (password != repassword) {
            return exits.success({ 'em': 'Mật khẩu đăng nhập không trùng khớp' });
        }
        if (passtrading != repasstrading) {
            return exits.success({ 'em': 'Mật khẩu đặt lệnh không trùng khớp' });
        }
        var exit = await UserInfor.exit(inputs.username);
        if (exit) {
            return exits.success({ 'em': 'Tài khoản đã tồn tại' });
        }
        delete inputs.repasstrading;
        delete inputs.repassword;
        await UserInfor.creat(inputs.username, JSON.stringify(inputs))
        return exits.success({ 'em': 'Thành công' });
    }
};
