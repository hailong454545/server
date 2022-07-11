/**
 * Seed Function
 * (sails.config.bootstrap)
 *
 * A function that runs just before your Sails app gets lifted.
 * > Need more flexibility?  You can also create a hook.
 *
 * For more information on seeding your app with fake data, check out:
 * https://sailsjs.com/config/bootstrap
 */

const UserInfo = require('../api/components/redis-store/UserInfor')
const UserToken = require('../api/components/redis-store/UserToken')

module.exports.bootstrap = async function (done) {
  UserInfo.init();
  UserToken.init();
  return done();
};
