const Products = require('../models/product');
const { Product } = require('../models');

exports.getProducts = (req, res, next) => {
  Product.findAll().then(function(products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Products.findById(prodId, Products => {
    res.render('shop/product-detail', {
      product: Products,
      pageTitle: Products.title,
      path: '/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.findAll().then(function(products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  })
};

exports.getCart = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Your Cart',
    products: []
  });
};

exports.postCart = (req, res, next) => {
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
