const { stock, exchange, indexExchange, indexStock, sideBuy, sideSell } = require('../../components/market/MarketInfo')

const processEventPriceBoard = (amount, price, symbol) => {
    price = price.toFixed(2);
    var dataSocket = {
        closeVol: amount,
        closePrice: price,
        totalTrading: stock[indexStock[symbol]].totalTrading + amount,
        low: stock[indexStock[symbol]].low > price ? price: stock[indexStock[symbol]].low,
        high: stock[indexStock[symbol]].high < price ? price: stock[indexStock[symbol]].high,
    }
    if (stock[indexStock[symbol]].closePrice == price) {
        dataSocket.closeVol = stock[indexStock[symbol]].closeVol + amount
    }
    stock[indexStock[symbol]] = {...stock[indexStock[symbol]] ,...dataSocket}
    var topPriceBuy = [{price: 0, amount: 0}, {price: 0, amount: 0}, {price: 0, amount: 0}]
    var index = 0
    Object.keys(sideBuy[symbol]).forEach((e) => {
        if (sideBuy[symbol][e] && index != 3) {
            topPriceBuy[index] = {price: e, amount: sideBuy[symbol][e]}
            index++
        }
    })
    var topPriceSell = [{price: 0, amount: 0}, {price: 0, amount: 0}, {price: 0, amount: 0}]
    index = 0
    Object.keys(sideSell[symbol]).forEach((e) => {
        if (sideSell[symbol][e] && index != 3) {
            topPriceSell[index] = {price: e, amount: sideSell[symbol][e]}
            index++
        }
    })
    stock[indexStock[symbol]].offerPrice1 = topPriceBuy[2].price
    stock[indexStock[symbol]].offerVol1 = topPriceBuy[2].amount
    stock[indexStock[symbol]].offerPrice2 = topPriceBuy[1].price
    stock[indexStock[symbol]].offerVol2 = topPriceBuy[1].amount
    stock[indexStock[symbol]].offerPrice3 = topPriceBuy[0].price
    stock[indexStock[symbol]].offerVol3 = topPriceBuy[0].amount

    stock[indexStock[symbol]].bidPrice3 = topPriceSell[0].price
    stock[indexStock[symbol]].bidVol3 = topPriceSell[0].amount
    stock[indexStock[symbol]].bidPrice2 = topPriceSell[1].price
    stock[indexStock[symbol]].bidVol2 = topPriceSell[1].amount
    stock[indexStock[symbol]].bidPrice1 = topPriceSell[2].price
    stock[indexStock[symbol]].bidVol1 = topPriceSell[2].amount

    sails.sockets.blast("event-price-board", stock);
}
module.exports = {
    inputs: {
        symbol: {
            type: 'string'
        },
        price: {
            type: 'number'
        },
        amount: {
            type: 'number'
        },
        type: {
            type: 'string'
        },
        pin: {
            type: 'string'
        },
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
        var { symbol, price, amount, type, pin } = inputs;
        var custid = this.req.options.userinfo.custid;
        if (pin != this.req.options.userinfo.passtrading) {
            return exits.success({ em: 'Mã pin không hợp lệ' })
        }
        if (type == 'buy') {
            sideBuy[symbol][price] += amount
        }
        else {
            sideSell[symbol][price] += amount
        }
        if (type == 'buy') {
            var balanceAccount = await StockAccount.find({ custid })
            balanceAccount = balanceAccount[0];
            await StockAccount.update({ id: balanceAccount.id }).set({ balance: balanceAccount.balance - price * amount*1000, balancewait: balanceAccount.balancewait + price * amount*1000 })
        }
        var newOrder = await Order.create({ ...inputs, custid, status: 'P' }).fetch();
        var sortPrice = null;
        if (type == 'buy') {
            type = 'sell';
            sortPrice = 'ASC';
            var listOrders = await Order.find({ status: 'P', type, symbol }).sort([{ updatedAt: 'ASC'}, { price: sortPrice }]);
            var amountMatching = 0;
            var averagePrice = 0;
            for (let i = 0; i < listOrders.length; i++) {
                if (listOrders[i].price <= price) {
                    var total = await OrderMatching.sum('amount').where({ orderid: listOrders[i].id })
                    if (listOrders[i].amount - total <= amount) {
                        await Order.update({ id: listOrders[i].id }).set({ status: 'S' });
                        await OrderMatching.create({ orderid: listOrders[i].id, amount: listOrders[i].amount - total, price: listOrders[i].price })
                        var balanceAccount = await StockAccount.find({ custid: listOrders[i].custid })
                        balanceAccount = balanceAccount[0];
                        await StockAccount.update({ id: balanceAccount.id }).set({ balancewaitreturn: balanceAccount.balancewaitreturn + (listOrders[i].amount - total) * listOrders[i].price*1000 })
                        amount -= listOrders[i].amount + total
                        averagePrice = (averagePrice * amountMatching + (listOrders[i].amount - total) * listOrders[i].price) / (amountMatching + listOrders[i].amount - total)
                        amountMatching += listOrders[i].amount - total
                        processEventPriceBoard(listOrders[i].amount - total, listOrders[i].price, symbol)
                    }
                    else {
                        await OrderMatching.create({ orderid: listOrders[i].id, amount: amount, price: listOrders[i].price })
                        var balanceAccount = await StockAccount.find({ custid: listOrders[i].custid })
                        balanceAccount = balanceAccount[0];
                        await StockAccount.update({ id: balanceAccount.id }).set({ balancewaitreturn: balanceAccount.balancewaitreturn + amount * listOrders[i].price*1000 })
                        averagePrice = (averagePrice * amountMatching + amount * listOrders[i].price) / (amountMatching + amount)
                        processEventPriceBoard(amount, listOrders[i].price, symbol)
                        amountMatching += amount
                        amount = 0
                    }
                    if (amount == 0) {
                        break;
                    }
                }
            }
            if (amount == 0) {
                await Order.update({ id: newOrder.id }).set({ status: 'S' })
            }
            if (amountMatching != 0) {
                await OrderMatching.create({ orderid: newOrder.id, amount: amountMatching, price: averagePrice })
                var balanceAccount = await StockAccount.find({ custid })
                balanceAccount = balanceAccount[0];
                console.log(amountMatching, averagePrice, price)
                await StockAccount.update({ id: balanceAccount.id }).set({ balancewait: balanceAccount.balancewait - amountMatching * price *1000, balance: balanceAccount.balance + (price - averagePrice) * amountMatching  })
            }
        }
        else {
            type = 'buy'
            sortPrice = 'DESC'
            var listOrders = await Order.find({ status: 'P', type, symbol }).sort([{ updatedAt: 'ASC' }, { price: sortPrice }]);
            var amountMatching = 0;
            var averagePrice = 0
            for (let i = 0; i < listOrders.length; i++) {
                if (listOrders[i].price >= price) {
                    var total = await OrderMatching.sum('amount').where({ orderid: listOrders[i].id })
                    if (listOrders[i].amount - total <= amount) {
                        await Order.update({ id: listOrders[i].id }).set({ status: 'S' });
                        await OrderMatching.create({ orderid: listOrders[i].id, amount: listOrders[i].amount - total, price: price })
                        var balanceAccount = await StockAccount.find({ custid: listOrders[i].custid })
                        balanceAccount = balanceAccount[0];
                        await StockAccount.update({ id: balanceAccount.id }).set({ balancewait: balanceAccount.balancewait - (listOrders[i].amount - total) * listOrders[i].price *1000, balance: balanceAccount.balance + (listOrders[i].price - price) * (listOrders[i].amount - total) * 1000 })
                        amount -= listOrders[i].amount - total
                        averagePrice = (averagePrice * amountMatching + (listOrders[i].amount - total) * price) / (amountMatching + listOrders[i].amount - total)
                        amountMatching += listOrders[i].amount - total
                        processEventPriceBoard(listOrders[i].amount - total, price, symbol)

                    }
                    else {
                        await OrderMatching.create({ orderid: listOrders[i].id, amount: amount, price: price })
                        var balanceAccount = await StockAccount.find({ custid: listOrders[i].custid })
                        balanceAccount = balanceAccount[0];
                        await StockAccount.update({ id: balanceAccount.id }).set({ balancewait: balanceAccount.balancewait - amount * listOrders[i].price *1000, balance: balanceAccount.balance + (listOrders[i].price - price) * amount * 1000 })
                        averagePrice = (averagePrice * amountMatching + amount * price) / (amountMatching + amount)
                        amountMatching += amount
                        processEventPriceBoard(amount, price, symbol)
                        amount = 0
                    }
                    if (amount == 0) {
                        break
                    }
                }
            }
            if (amount == 0) {
                await Order.update({ id: newOrder.id }).set({ status: 'S' })
            }
            if (amountMatching != 0) {
                await OrderMatching.create({ orderid: newOrder.id, amount: amountMatching, price: averagePrice })
                var balanceAccount = await StockAccount.find({ custid })
                balanceAccount = balanceAccount[0];
                await StockAccount.update({ id: balanceAccount.id }).set({ balancewaitreturn: balanceAccount.balancewaitreturn + amountMatching * price *1000 })
            }
        }
        return exits.success({em: ''})
    }
};
