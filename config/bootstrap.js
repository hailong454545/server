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
const UserToken = require('../api/components/redis-store/UserToken');
const marketInfo = require('../api/components/market/MarketInfo')

module.exports.bootstrap = async function (done) {
  var dataStock = await StockInfor.find().sort([{ symbol: 'ASC'}]);
  for(let i = 0; i < dataStock.length; i++) {
    marketInfo.stock.push(dataStock[i]);
  }
  for(let i = 0; i < dataStock.length; i++) {
    marketInfo.indexStock[dataStock[i].symbol] = i
    marketInfo.sideSell[dataStock[i].symbol] = {}
    for(let j = dataStock[i].floor; j <= dataStock[i].ceiling; j+=0.05) {
      marketInfo.sideSell[dataStock[i].symbol][j.toFixed(2)] = 0;
    }
  }
  for(let i = 0; i < dataStock.length; i++) {
    marketInfo.indexStock[dataStock[i].symbol] = i
    marketInfo.sideBuy[dataStock[i].symbol] = {}
    for(let j = dataStock[i].ceiling; j >= dataStock[i].floor; j-=0.05) {
      marketInfo.sideBuy[dataStock[i].symbol][j.toFixed(2)] = 0;
    }
  }
  var dataExchange = await ExchangeInfor.find().sort([{ symbol: 'ASC'}]);
  marketInfo.exchange = dataExchange;
  for(let i = 0; i < dataExchange.length; i++) {
    marketInfo.indexExchange[dataExchange[i].symbol] = i;
  }
  // console.log(marketInfo.sideBuy, marketInfo.sideSell)
  UserInfo.init();
  UserToken.init();
  return done();
};
