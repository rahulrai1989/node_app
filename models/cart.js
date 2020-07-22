'use strict';
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define('cart', {
    
  }, {});
  cart.associate = function(models) {
    cart.belongsTo(models.user);
    cart.belongsToMany(models.product, {through: models.cartitem});
  };
  return cart;
};