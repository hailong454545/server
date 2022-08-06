module.exports = {
  attributes: {
    symbol: { type: 'string', required: true },
    StockId: { type: 'string', defaultsTo: '' },
    FullName: { type: 'string', defaultsTo: '' },
    tradingdate: { type: 'string', defaultsTo: '' },
    FloorCode: { type: 'string', defaultsTo: '' },
    StockType: {
      type: 'string', defaultsTo: ''
    },

    ceiling: { type: 'number', defaultsTo: 0 },
    floor: { type: 'number', defaultsTo: 0 },
    reference: { type: 'number', defaultsTo: 0 },
    bidPrice3: { type: 'number', defaultsTo: 0 },
    bidVol3: { type: 'number', defaultsTo: 0 },
    bidPrice2: { type: 'number', defaultsTo: 0 },
    bidVol2: { type: 'number', defaultsTo: 0 },
    bidPrice1: { type: 'string', defaultsTo: '' },
    bidVol1: { type: 'number', defaultsTo: 0 },
    closePrice: { type: 'number', defaultsTo: 0 },
    closeVol: { type: 'number', defaultsTo: 0 },
    change: { type: 'number', defaultsTo: 0 },
    changePercent: { type: 'number', defaultsTo: 0 },
    offerPrice1: { type: 'string', defaultsTo: '' },
    offerVol1: { type: 'number', defaultsTo: 0 },
    offerPrice2: { type: 'number', defaultsTo: 0 },
    offerVol2: { type: 'number', defaultsTo: 0 },
    offerPrice3: { type: 'number', defaultsTo: 0 },
    offerVol3: { type: 'number', defaultsTo: 0 },
    totalTrading: { type: 'number', defaultsTo: 0 },
    totalTradingValue: { type: 'number', defaultsTo: 0 },
    averagePrice: { type: 'number', defaultsTo: 0 },
    open: { type: 'number', defaultsTo: 0 },
    high: { type: 'number', defaultsTo: 0 },
    low: { type: 'number', defaultsTo: 0 },
    exchange: { type: 'string', defaultsTo: '' },
  }
}
