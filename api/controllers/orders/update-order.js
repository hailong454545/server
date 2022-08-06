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
            var result = await StockInfor.find();
            return exits.success(result)
        }
        else {
            var result = await StockInfor.find({ exchange });
            return exits.success(result)
        }
    }
};
