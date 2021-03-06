const { product } = require('../models');

exports.getProducts = (req, res, next) => {
  product.findAll().then(function(products) {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
      isAuthenticated: req.isLoggedIn
    });
  })
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  product.findByPk(prodId).then(products => {
    if (!products) {
        return es.redirect('/');
    }
    res.render('shop/product-detail', {
      product: products,
      pageTitle: products.title,
      path: '/products',
      isAuthenticated: req.isLoggedIn
    });
  });
};

exports.getIndex = (req, res, next) => {
  product.findAll().then(function(products) {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      isAuthenticated: req.isLoggedIn
    });
  })
};

exports.getCart = (req, res, next) => {
  let products = [];
  req.user.getCart()
  .then(cart => {
      return cart.getProducts()
      .then(products => {
        res.render('shop/cart', {
          path: '/cart',
          pageTitle: 'Your Cart',
          products: products,
          isAuthenticated: req.isLoggedIn
        });
      })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  let fetchedCart;
  let newQuantity = 1;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts({where : {id: prodId}});
  })
  .then(products => {
    let productData;
    if (products.length > 0) {
      productData = products[0];
    }
    
    if (productData) {
      const oldQuantity = productData.cartitem.quantity;
      newQuantity = oldQuantity + 1;
      return productData;
    }
    return product.findByPk(prodId);
  })
  .then(products => {
    return fetchedCart.addProduct(products, {
      through: {quantity: newQuantity}
    });
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user.getCart()
  .then(cart => {
      return cart.getProducts({where : {id: prodId}});
  })
  .then(products => {
      const productData = products[0];
      productData.cartitem.destroy();
  })
  .then(() => {
    res.redirect('/cart');
  })
  .catch(err => console.log(err));
};

exports.postOrders = (req, res, next) => {
  let fetchedCart;
  req.user.getCart()
  .then(cart => {
    fetchedCart = cart;
    return cart.getProducts();
  })
  .then(products => {
    return req.user
    .createOrder()
    .then(order => {
      return order.addProducts(products.map(prod => {
        prod.orderitem = { quantity: prod.cartitem.quantity }  
          return prod; 
        })
      );
    })
    .then(results => {
      return fetchedCart.setProducts(null);
    })
    .then(results => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
  })
  .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  req.user.getOrders({include: ['products']})
  .then(orders => {
    res.render('shop/orders', {
      path: '/orders',
      pageTitle: 'Your Orders',
      orders: orders,
      isAuthenticated: req.isLoggedIn
    });
  })
  .catch(err => console.log(err));
};
