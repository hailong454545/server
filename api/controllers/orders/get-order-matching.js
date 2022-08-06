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
        var output = []
        for(let i = 0; i < result.length; i++) {
            var orderMatch = await OrderMatching.find({orderid: result[i].id})
            for(let j = 0; j < orderMatch.length; j++) {
                orderMatch[j] = {...result[i], ...orderMatch[j]}
                output.push(orderMatch[j])
            }
        }
        return exits.success(output)
    }
};
