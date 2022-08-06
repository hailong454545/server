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
        var { custid } = this.req.options.userinfo;
        var result = await StockDirectory.find({custid});
        return exits.success(result);
    }
};
