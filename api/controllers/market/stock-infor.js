var { stock } = require('../../components/market/MarketInfo')
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
module.exports = {
    inputs: {
        exchange: {
            type: 'string',
            defaultsTo: 'ALL'
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
        var { exchange } = inputs;
        if (exchange == 'ALL') {
            var result = await StockInfor.find().sort([{symbol: 'ASC'}]);
            // const max = 100000;
            // const min = 2000;
            // var clone = {};
            // for(let i = 0; i < result.length; i++) {
            //     clone.reference = parseInt(getRandomArbitrary(min, max) / 10)*10;
            //     clone.floor = clone.reference * 0.93;
            //     clone.ceiling = clone.reference * 1.07;
            //     clone.offerVol1 = parseInt(getRandomArbitrary(min, max/20) / 100)*10;
            //     clone.offerVol2 = parseInt(getRandomArbitrary(min, max/20) / 100)*10;
            //     clone.offerVol3 = parseInt(getRandomArbitrary(min, max/20) / 100)*10;
            //     clone.bidVol1 = parseInt(getRandomArbitrary(min, max/20) / 100)*10;
            //     clone.bidVol2 = parseInt(getRandomArbitrary(min, max/20) / 100)*10;
            //     clone.bidVol3 = parseInt(getRandomArbitrary(min, max/20) / 100)*10;
            //     clone.offerPrice1 = Math.random() * (clone.ceiling - clone.floor) + clone.floor;
            //     clone.offerPrice2 = Math.random() * (clone.ceiling - clone.offerPrice1) + clone.offerPrice1;
            //     clone.offerPrice3 = Math.random() * (clone.ceiling - clone.offerPrice2) + clone.offerPrice2;
            //     clone.bidPrice1 = Math.random() * (clone.ceiling - clone.offerPrice3) + clone.offerPrice3;
            //     clone.bidPrice2 = Math.random() * (clone.ceiling - clone.bidPrice1) + clone.bidPrice1;
            //     clone.bidPrice3 = Math.random() * (clone.ceiling - clone.bidPrice2) + clone.bidPrice2;
            //     clone.totalTrading = parseInt(getRandomArbitrary(min, max/100) / 100)*100;
            //     clone.averagePrice = (Math.random() * (clone.ceiling - clone.floor) + clone.floor);
            //     clone.totalTradingValue = clone.totalTrading * clone.averagePrice;
            //     clone.closePrice = clone.offerPrice3;
            //     clone.open = Math.random() * (clone.ceiling - clone.floor) + clone.floor;
            //     clone.high = Math.random() * (clone.ceiling - clone.closePrice) + clone.closePrice;
            //     clone.low = Math.random() * (clone.offerPrice1 - clone.floor) + clone.floor;

            //     clone.reference = (clone.reference/1000).toFixed(2);
            //     clone.floor = (clone.floor/1000).toFixed(2);
            //     clone.ceiling = (clone.ceiling/1000).toFixed(2);
            //     clone.closePrice = (clone.closePrice/1000).toFixed(2);
            //     // clone.changePercent = result[i].changePercent.toFixed(2);
                
            //     clone.offerPrice1 = (clone.offerPrice1/1000).toFixed(2); 
            //     clone.offerPrice2 = (clone.offerPrice2/1000).toFixed(2);
            //     clone.offerPrice3 = (clone.offerPrice3/1000).toFixed(2); 
            //     clone.bidPrice1 = (clone.bidPrice1/1000).toFixed(2); 
            //     clone.bidPrice2 = (clone.bidPrice2/1000).toFixed(2); 
            //     clone.bidPrice3 = (clone.bidPrice3/ 1000).toFixed(2); 
            //     clone.averagePrice = (clone.averagePrice/ 1000).toFixed(2); 
            //     clone.open = (clone.open / 1000).toFixed(2); 
            //     clone.high = (clone.high /1000).toFixed(2); 
            //     clone.low = (clone.low/ 1000).toFixed(2); 
            //     console.log(clone)
            //     await StockInfor.update({id: result[i].id}).set(clone);
            // }
            // var count = {'HOSE': 0, 'UPCOM': 0, 'HNX': 0}
            // for(let i = 0; i < result.length; i++) {
            //     if (count[result[i].exchange] > 30) {
            //         await StockInfor.destroy({id: result[i].id});
            //     }
            //     else {
            //         count[result[i].exchange]++;
            //     }
            // }
            return exits.success(result && stock)
        }
        else {
            var result = await StockInfor.find({ exchange });
            return exits.success(result)
        }
    }
};
