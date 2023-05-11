const { sideBuy, sideSell } = require("../../components/market/MarketInfo");

module.exports = {
    inputs: {
        id: {
            type: 'number',
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
        var { id } = inputs;
        var infoOrder = await Order.find({id});
        infoOrder = infoOrder[0];
        var sumOrderMatching = await OrderMatching.sum('amount').where({orderid: id})
        if (infoOrder.type == 'sell') {
            sideSell[infoOrder.symbol][infoOrder.price] -= (infoOrder.amount-sumOrderMatching)
        }
        else {
            sideBuy[infoOrder.symbol][infoOrder.price] -= (infoOrder.amount-sumOrderMatching)
        }
        await Order.destroy({id})
        return exits.success({em: ''})
    }
};
