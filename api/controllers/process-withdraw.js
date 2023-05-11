module.exports = {
    inputs: {
        bankid: {
            type: 'number',
            required: true
        },
        amout: {
            type: 'number',
            required: true
        },
        pin: {
            type: 'string',
            required: true
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
        var { bankid, amout, pin } = inputs
        var { custid } = this.req.options.userinfo
        if (pin != this.req.options.userinfo.passtrading) {
            return exits.success({em: "Mã pin không hợp lệ"})
        }
        var infoMoney = await StockAccount.find({custid});
        if (infoMoney[0].banlance - amout < 0) {
            return exits.success({em: "Tiền không đủ để rút"})
        }
        var bankInfo = await BenefitAccount.find({id: bankid});
        await StockAccount.update({custid}).set({banlance: infoMoney[0].banlance - amout })
        await ChangeBalance.create({custid, type: 'Rút tiền', balancewaitreturn: '0', amount: amout, fromAccount: "Tài khoản chứng khoán", toAccount: bankInfo[0].bankname})
        return exits.success({em: ""});
    }
};
