module.exports = function success(object) {
  this.res.status(200);
  return this.res.json(object);
};
