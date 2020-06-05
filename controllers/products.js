const Products = require('../models/product');
const { Product } = require('../models');

exports.addProduct = (req, res, next) => {
	res.render('admin/add-product', {
		pageTitle: 'Add Product', 
		path: '/admin/add-product'
	});
};

exports.postProduct = (req, res, next) => {
	const Products = Products.create({
		title: this.title, 
		image_url: this.imageUrl,
		description: this.description,
		price: this.price
    });
    console.log("Product auto-generated ID:", Products.id);
	res.redirect('/');
};

exports.getProducts = (req, res, next) => {
	Product.findAll().then(function(products) {
		res.render('shop/product-list', {
		  prods: products,
		  pageTitle: 'Shop',
		  path: '/'
		});
	});
};