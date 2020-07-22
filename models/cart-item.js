'use strict';
module.exports = (sequelize, DataTypes) => {
  const cartitem = sequelize.define('cartitem', {
    id: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       allowNull: false,
       primaryKey: true
    },
    quantity: DataTypes.INTEGER
  }, {});
  cartitem.associate = function(models) {
    
  };
  return cartitem;
};