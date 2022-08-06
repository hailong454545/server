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
        console.log(this.req.options.userinfo);
        var result = await StockAccount.find({custid});
        return exits.success(result);
    }
};
