'use strict';
const fs = require('fs');
const path = require('path');

module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define('product', {
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    user_id: DataTypes.INTEGER,
  }, { timestamps: true, underscored: true});
  product.associate = function(models) {
    product.associate = function(models) {
      product.belongsTo(models.user, {
        foreignKey: 'user_id',
        constraints: true,
        onDelete: 'CASCADE'
      });
    };
  };
  return product;
};