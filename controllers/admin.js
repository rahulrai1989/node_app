const Products = require('../models/product');
const { Product } = require('../models');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        editing: false
    });
};

exports.postAddProduct = (req, res, next) => {
	const product = Product.create({
		title: req.body.title, 
		image_url: req.body.imageUrl,
		description: req.body.description,
		price: req.body.price
    });
    res.redirect('/');
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return es.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId).then(products => {
        if (!products) {
            return es.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/add-product',
            editing: editMode,
            product: products
        });
    });
};

exports.postEditProduct = (req, res, next) => {
    const productId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    Product.update({
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
    Products.deleteById(prodId);
    res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
    Product.findAll().then(function(products) {
        res.render('admin/products', {
          prods: products,
          pageTitle: 'Admin Products',
          path: '/admin/products'
        });
    })
};
