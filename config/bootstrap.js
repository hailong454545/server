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
const marketInfo = require('../api/components/market/MarketInfo');


module.exports.bootstrap = async function (done) {
  var dataStock = await StockInfor.find().sort([{ symbol: 'ASC'}]);
  for(let i = 0; i < dataStock.length; i++) {
    dataStock[i].high = 0
    dataStock[i].low = 0
    marketInfo.stock.push(dataStock[i]);
  }
  // for(let i = 0; i < dataStock.length; i++) {
  //   await StockInfor.update({id: dataStock[i].id}).set({floor: parseFloat(dataStock[i].floor.toFixed(1)), ceiling: parseFloat(dataStock[i].ceiling.toFixed(1)),reference: parseFloat(dataStock[i].reference.toFixed(1))})
  // }
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
  
  for(let i = 0; i < dataExchange.length; i++) {
    dataExchange[i].point = await StockInfor.sum('closePrice').where({'exchange': dataExchange[i].symbol});
    dataExchange[i].totalTrading = 0
    dataExchange[i].totalTradingValue = 0
    dataExchange[i].up = 0
    dataExchange[i].down = 0
    dataExchange[i].noChange = 0
    dataExchange[i].oldPoint = await StockInfor.sum('closePrice').where({'exchange': dataExchange[i].symbol});
    dataExchange[i].incrase = 0
    // marketInfo.indexStock[dataExchange[i].symbol] = dataExchange[i]
    marketInfo.indexExchange[dataExchange[i].symbol] = i;
    for(let j = 0; j < dataStock.length; j++) {
      // dataStock[j].closePrice
      if (dataStock[j].exchange == dataExchange[i].symbol) {
        if (dataStock[j].closePrice > dataStock[j].reference ) {
          dataExchange[i].up++;
        }
        else if (dataStock[j].closePrice < dataStock[j].reference) {
          dataExchange[i].down++;
        }
        else {
          dataExchange[i].noChange++;
        }
      }
    }
  }
  for(let i = 0; i < dataExchange.length; i++) {
    marketInfo.exchange.push(dataExchange[i]);
  }
  var dataChart = await Chart.find().sort([{'id': 'ASC'}]);
  for(let i = 0; i < dataChart.length; i++) {
    var { createdAt, open, high, low, close, volume } = dataChart[i]
    marketInfo.chart.push([createdAt, open, high, low, close, volume])
  }
  marketInfo.chart.push([0, 0, 0, 0, 0, 0])
  const sendSocketChart = async () => {
    var dataClose = marketInfo.chart[marketInfo.chart.length-1]
    var data = {
      open: dataClose[1],
      high: dataClose[2],
      low: dataClose[3],
      close: dataClose[4],
      volume: dataClose[5],
    }
    var records = await Chart.create(data).fetch();
    marketInfo.chart[marketInfo.chart.length-1][0] = records.createdAt
    sails.sockets.blast('event-chart', marketInfo.chart[marketInfo.chart.length-1])
    marketInfo.chart.push([0, 0, 0, 0, 0, 0])
  }
  // setInterval(sendSocketChart ,3000)
  // console.log(marketInfo.sideBuy, marketInfo.sideSell)
  UserInfo.init();
  UserToken.init();
  return done();
};
