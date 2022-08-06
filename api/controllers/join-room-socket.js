module.exports = (req, res, next) => {
    sails.sockets.blast("event-price-board", {test: 1});
    return 1
}