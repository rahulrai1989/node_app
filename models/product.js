'use strict';
const fs = require('fs');
const path = require('path');

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    image_url: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
  }, { timestamps: true, underscored: true});
  Product.associate = function(models) {
    // associations can be defined here
  };
  return Product;
};