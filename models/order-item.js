'use strict';
module.exports = (sequelize, DataTypes) => {
  const orderitem = sequelize.define('orderitem', {
    id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
    },
    quantity: DataTypes.INTEGER
  }, {});
  orderitem.associate = function(models) {
    
  };
  return orderitem;
};