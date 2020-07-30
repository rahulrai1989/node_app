'use strict';
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define('order', {
    id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
    }
  }, {});
  order.associate = function(models) {
    order.belongsTo(models.user);
    order.belongsToMany(models.product, {through: models.orderitem});
  };
  return order;
};