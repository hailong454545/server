var request = require('request');
var body = {
  "symbol": "AFX",
  "price": 6.45,
  "amount": 100,
  "type": "sell",
  "pin": "13012019"
}
var options = {
  'method': 'POST',
  'url': 'http://localhost:3003/order/createOrder',
  'headers': {
    'Authorization': 'Bearer nemfx7helqVYG2KBHZ4WlNl729s5jEgda1HFM3PU3GTGIZgzd74tJWNhfUhV48e9N7CA27LroZ55CHuvDgm6iGrAopN0MaQhUTolpPfPHrqiljdT0ZqrHQa6X0DsY3qSHTIOMJ9Q0nNWQo0jHrLLvuyrQvOAGWAxnfas4lusfxxFI740d3IxNAVfbuXpm8ympvovIoFHeCgvjYDQGq06tH4oWhZMkt355btedsaZMxVqKnopmWkPhegXDma5DKT',
    'Content-Type': 'application/json',
    'Cookie': 'sails.sid=s%3AsAoXFAH3yXOvAiWBmVTPDc_C7yF2q8eU.5NX5bisfpZfTS8Q224e5tp2agKzx0PFpSy%2BPJmnN8AY'
  },
  body: JSON.stringify(body)
};


const BotSell = () => {
  body.price = 6.4 + Math.ceil(Math.random() * 8 - 3) * 0.05
  options.body = JSON.stringify(body)
  request(options, function (error, response) {
    if (error) throw new Error(error);
  });
}

setInterval(BotSell, 200)


