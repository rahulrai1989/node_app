const { product } = require('../models');

exports.addProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product', 
		path: '/admin/add-product'
	});
};

exports.postProduct = (req, res, next) => {
	const products = product.create({
		title: this.title, 
		image_url: this.imageUrl,
		description: this.description,
		price: this.price
    });
    console.log("Product auto-generated ID:", products.id);
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	product.findAll().then(function(products) {
		res.render('shop/product-list', {
		  prods: products,
		  pageTitle: 'Shop',
		  path: '/'
		});
	});
};