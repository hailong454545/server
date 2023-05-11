/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  '/': { view: 'pages/homepage' },
  'POST /openAccount': { action: 'accounts/open-account' },
  'POST /login': { action: 'accounts/login' },
  'POST /logout': { action: 'accounts/logout' },
  'POST /changePass': { action: 'accounts/change-pass' },
  'POST /order/createOrder': { action: 'orders/creat-order' },
  'POST /order/deleteOrder': { action: 'orders/delete-order' },
  'GET /order/listOrder': { action: 'orders/get-order' },
  'GET /order/listOrderMatching': { action: 'orders/get-order-matching' },
  'POST /processWithDraw': { action: 'process-withdraw'},
  'POST /callInMoney': { action: 'call-in-money'},
  'GET /historyBanlance': { action: 'get-history-banlance'},


  'GET /trade/marketInfo': { action: 'market/stock-infor' },
  'GET /trade/exchangeInfo': { action: 'market/exchange-infor' },
  'GET /account/listFavarot': { action: 'accounts/list-favarot'},
  'GET /account/banlance': { action: 'accounts/get-banlance'},
  'GET /account/portfolio': { action: 'accounts/get-portfolio'},
  'GET /account/benifitAccount': { action: 'accounts/get-benifit'},
  'GET /socketEventPriceBoard': { action: 'join-room-socket' },
  'GET /chart': { action: 'get-data-chart' },
};
