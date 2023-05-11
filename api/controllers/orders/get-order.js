module.exports = {
    inputs: {
        status: {
            type: 'string'
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
        var custid = this.req.options.userinfo.custid;
        if (inputs.status == "ALL") {
            var result = await Order.find({ custid });
            for (let i = 0; i < result.length; i++) {
                var orderMatch = await OrderMatching.find({ orderid: result[i].id });
                var totalMatch = 0;
                for (let j = 0; j < orderMatch.length; j++) {
                    totalMatch += orderMatch[j].amount
                }
                result[i].amountMatch = totalMatch;
            }
            return exits.success(result)
        }
        var result = await Order.find({ custid });
        var output = []
        for (let i = 0; i < result.length; i++) {
            if (parseInt(result[i].createAt / 86400000) != parseInt(new Date().getTime()/86400000)) {
                continue
            }
            var orderMatch = await OrderMatching.find({ orderid: result[i].id });
            var totalMatch = 0;
            for (let j = 0; j < orderMatch.length; j++) {
                totalMatch += orderMatch[j].amount
            }
            result[i].amountMatch = totalMatch;
            output.push(result[i])
        }
        return exits.success(output)
    }
};
