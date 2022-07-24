const Product = require('../models/product');
const Order = require('../models/order');

// exports.getHome = (req, res, next) => {
//     res.render('home/home', {
//         path: '/home',
//         pageTitle: 'Home',
//         prods: products
//     });
// };


exports.getHome = (req, res, next) => {
    Product.find()
        .then(products => {
            console.log(products);
            res.render('home/home', {
                prods: products,
                pageTitle: 'PetFinder',
                path: '/home'
            });
        })
        .catch(err => {
            console.log(err);
        });
};