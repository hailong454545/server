module.exports = {
    inputs: {
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
        var custid = this.req.options.userinfo.custid;
        var result = await Order.find({custid});
        for(let i = 0; i < result.length; i++) {
            var orderMatch = await OrderMatching.find({orderid: result[i].id});
            var totalMatch = 0;
            for(let j = 0; j < orderMatch.length; j++) {
                totalMatch += orderMatch[j].amount
            }
            result[i].amountMatch = totalMatch;
        }
        return exits.success(result)
    }
};
