'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  user.associate = function(models) {
    user.hasMany(models.product);
    user.hasOne(models.cart);
  };
  return user;
};