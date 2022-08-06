/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
  // '*': true,
  '*': ['checkAuth'],
  'market/stock-infor': true,
  'market/*': true,
  'accounts/open-account': true,
  'accounts/login': true,
  'join-room-socket': true
};
