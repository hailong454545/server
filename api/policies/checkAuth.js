var UserToken = require('../components/redis-store/UserToken')

module.exports = async function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return res.json({ em: 'Token hết hạn hoặc không hợp lệ' });
    }
    token = token.substring(7);
    var userinfo = await UserToken.get(token);
    if (userinfo) {
        req.options.userinfo = JSON.parse(userinfo);
        return next();
    }
    return res.json({ em: 'Token hết hạn hoặc không hợp lệ' });
}