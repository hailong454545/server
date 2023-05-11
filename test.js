var request = require('request');
var body = {
  "symbol": "AFX",
  "price": 6.45,
  "amount": 100,
  "type": "buy",
  "pin": "13012019"
}
var options = {
  'method': 'POST',
  'url': 'http://localhost:3003/order/createOrder',
  'headers': {
    'Authorization': 'Bearer HnukiVeLt5kZANT6FCasoEeuDeUmPHqYMXbqdSOhQxzBxkYGCTjs9BrOrl3BX5I2XyF0PifEBLvxf6aT7oPAvlIadUl6I7slH6mci03HXIniuqqpvNP56462eH45fkNHmszA40uc4qrwdvyvG7SYx3frc66e8liA4BN8WWqGCj1rtHTV3etwp5Ebub3sfxtyEm6pmG76BSw1I38jfZuW6TJ7C4LRgSTtE5gNqkQ3bjCOmwcRrX8AXrBrxV7EkOT',
    'Content-Type': 'application/json',
    'Cookie': 'sails.sid=s%3AsAoXFAH3yXOvAiWBmVTPDc_C7yF2q8eU.5NX5bisfpZfTS8Q224e5tp2agKzx0PFpSy%2BPJmnN8AY'
  },
  body: JSON.stringify(body)
};

var optionsStock = {
  'method': 'GET',
  'url': 'http://localhost:3003/trade/marketInfo',
  'headers': {
  }
};

const BotSell = (data) => {
  var { price, symbol } = data
  body.symbol = symbol
  body.price = price + Math.ceil(Math.random() * 5 - 3) * 0.05
  options.body = JSON.stringify(body)
  request(options, function (error, response) {
    if (error) throw new Error(error);
  });
}


request(optionsStock, function (error, response) {
  if (error) throw new Error(error);
  var data = response.body;
  data = JSON.parse(data);
  for(let i = 0; i < 10; i++) {
    setInterval(BotSell, Math.ceil(Math.random() * 3 + 7)*500 , {price: data[i].reference, symbol: data[i].symbol})
  }
});



