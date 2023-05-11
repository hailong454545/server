
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
        var { custid } = this.req.options.userinfo.custid;
        var data = await ChangeBalance.find({custid})
        return exits.success(data)
    }
};
