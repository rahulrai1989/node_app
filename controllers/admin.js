const { product } = require('../models');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false,
        isAuthenticated: req.isLoggedIn
    });
};

exports.postAddProduct = (req, res, next) => {
    req.user.createProduct({
        title: req.body.title, 
		image_url: req.body.imageUrl,
		description: req.body.description,
        price: req.body.price,
    });
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return es.redirect('/');
    }
    const prodId = req.params.productId;
    product.findByPk(prodId).then(products => {
        if (!products) {
            return es.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: editMode,
            product: products,
            isAuthenticated: req.isLoggedIn
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    product.update({
        title: title,
        image_url: imageUrl,
        price: price,
        description: description,
      }, {
        where: {
          id: productId
        }
    }).then(products => {
        if (products) {
            res.redirect('/');
        }
    });
};

exports.deleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    product.destroy({
        where: {
          id: prodId
        }
    });
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    req.user
    .getProducts()
    .then(function(products) {
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products',
          isAuthenticated: req.isLoggedIn
        });
    })
};
