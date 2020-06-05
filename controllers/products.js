const Product = require('../models/product');

exports.addProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product', 
		path: '/admin/add-product'
	});
};

exports.postProduct = (req, res, next) => {
	const product = new Product(req.body.title);
	product.save();
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.fetchAll(products => {
        res.render('shop/product-list', {
			prods: products, 
			pageTitle: 'Shop', 
			path: '/'
		});
	});
};