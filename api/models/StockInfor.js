/**
 * TestModel.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  primaryKey: 'symbol',
  attributes: {
    symbol: { type: 'string', required: true },
    StockId: { type: 'string', defaultsTo: '' },
    FullName: { type: 'string', defaultsTo: '' },
    exchange: { type: 'string', defaultsTo: '' },
  },
}