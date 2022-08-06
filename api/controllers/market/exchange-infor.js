
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
        var result = await ExchangeInfor.find();
        return exits.success(result)
    }
};
