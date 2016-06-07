'use strict';


/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Product = db.model('product');
var Tag = db.model('tag');
var Order = db.model('order');
var Review = db.model('review');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            isAdmin: true
        },
        {
            email: 'obama@gmail.com',
            password: 'potus'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);

};

var seedProducts = function() {
    var products = [
        {
            name: 'Sock',
            imageUrl: 'https://s-media-cache-ak0.pinimg.com/736x/fd/56/55/fd5655d3f79a5000b17852c3965e916c.jpg',
            price: 10.99,
            brand: 'OneSockMan',
            description: 'Selfies XOXO gluten-free synth, man braid meggings DIY vinyl echo park pabst. Cornhole art party blue bottle kogi normcore pickled, roof party chillwave beard venmo. Jean shorts organic kale chips, vinyl listicle meggings butcher green juice selvage scenester vegan hella. Kickstarter hoodie meggings banh mi gluten-free. Viral butcher farm-to-table etsy 8-bit. Squid man braid viral ennui. Seitan keffiyeh craft beer cred blog, kinfolk fixie.',
            quantity: 100
        },
        {
            name: 'North Face Glove',
            imageUrl: 'http://www.sportsauthority.com/graphics/product_images/pTSA-15061572p275w.jpg',
            price: 50.99,
            brand: 'North Face',
            description: 'Waistcoat swag art party 3 wolf moon, chicharrones seitan stumptown beard church-key chillwave literally sriracha. Poutine four dollar toast paleo cornhole, semiotics lumbersexual cold-pressed vice meditation pour-over whatever helvetica wayfarers yuccie. Beard vinyl man braid, tilde scenester cold-pressed narwhal vice street art hoodie raw denim etsy freegan. Shabby chic disrupt heirloom, church-key banh mi pinterest tattooed. Mustache cardigan brooklyn, bicycle rights dreamcatcher actually readymade leggings asymmetrical four loko selfies you probably haven\'t heard of them XOXO umami. VHS sartorial hoodie fixie, meh letterpress direct trade health goth retro neutra raw denim pickled distillery. Bespoke tilde kale chips lo-fi blog pabst cardigan four dollar toast ugh, seitan cray.',
            quantity: 100
        },
        {
            name: 'One Rib',
            imageUrl: 'https://i.ytimg.com/vi/E33RegW85yM/hqdefault.jpg',
            price: 0.25,
            brand: 'Applebees',
            description: 'Craft beer bespoke post-ironic gochujang direct trade shabby chic, tacos humblebrag fashion axe mlkshk twee typewriter chillwave meggings. Umami sriracha paleo post-ironic, blue bottle lumbersexual kickstarter mustache squid pork belly skateboard taxidermy. Echo park beard 90\'s tumblr you probably haven\'t heard of them 8-bit. Actually pabst 90\'s, chambray helvetica food truck kinfolk seitan typewriter raw denim. Crucifix irony pug, kogi seitan chia salvia intelligentsia letterpress green juice distillery. Godard tumblr shoreditch, kale chips swag pork belly fixie master cleanse aesthetic. Occupy neutra banh mi, four dollar toast roof party twee poutine biodiesel sartorial bushwick literally cronut keytar.',
            quantity: 1
        }
    ]

    var creatingProducts = products.map(function(productObj){
        return Product.create(productObj);
    })

    return Promise.all(creatingProducts);
}

var seedTags = function(){
    var tags = [
        {
            category: 'clothing'
        },
        {
            category: 'food'
        },
        {
            category: 'miscellaneous'
        }
    ]

    var creatingTags = tags.map(function(tagObj){
        return Tag.create(tagObj)
    });

    return Promise.all(creatingTags)
}

var seedOrders = function(){
    var orders = [
        {
            address: '2439 Star Route',
            city: 'Arlington Heights',
            state: 'IL',
            zipcode: 60005,
            billingaddress: '2439 Star Route',
            billingcity: 'Arlington Heights',
            billingstate: 'IL',
            billingzipcode: 60005,
            creditCard: 5319869385480010,
            orderTotal: 61.98,
            orderStatus: 'Created'
        }
    ]

    var creatingOrders = orders.map(function(orderObj){
        return Order.create(orderObj)
    })

    return Promise.all(creatingOrders)
}

var seedReviews = function() {
    var reviews = [
        {
            rating: 4,
            comment: 'Etsy gluten-free ethical man bun, banjo actually cray brooklyn plaid farm-to-table. Pug vice farm-to-table etsy ugh humblebrag, echo park gastropub man bun slow-carb pitchfork ramps kitsch lo-fi YOLO. Kitsch affogato tote bag tousled, mlkshk blue bottle yr leggings tacos umami VHS. Freegan put a bird on it listicle, chia offal before they sold out church-key. Literally chartreuse XOXO brooklyn, waistcoat slow-carb squid pour-over retro distillery franzen yr paleo. Blog biodiesel kogi, shabby chic keytar tilde kinfolk chillwave helvetica +1 ugh. Typewriter humblebrag kale chips drinking vinegar seitan mumblecore flannel beard, tilde +1 man braid scenester occupy hammock.'
        }
    ]

    var creatingReviews = reviews.map(function(reviewObj){
        return Review.create(reviewObj)
    })

    return Promise.all(creatingReviews)
}

db.sync({ force: true })
    .then(function () {
        return Promise.all([seedUsers(), seedProducts(), seedTags(), seedOrders(), seedReviews()]);
    })
    .then(function(){

        var findingUser = User.findOne({
            where: {
                email: 'testing@fsa.com'
            }
        })

        var findingOrder = Order.findOne({
            where: {
                id: 1
            }
        })

        var findingReview = Review.findOne({
            where: {
                id: 1
            }
        })

        var findingProduct = Product.findOne({
            where: {
                name: 'Sock'
            }
        })

        var findingProducts = Product.findAll();

        var findingTag = Tag.findOne({
            where: {
                category: 'clothing'
            }
        })

        var findingRib = Product.findOne({
            where: {
                name: 'One Rib'
            }
        })

        var findingFood = Tag.findOne({
            where: {
                category: 'food'
            }
        })

        return Promise.all([findingUser, findingOrder, findingReview, findingProduct, findingTag, findingProducts, findingRib, findingFood])
    })
    .spread(function(user, order, review, product, tag, products, productrib, foodtag){
        user.addReview(review);
        user.addOrder(order);
        product.addReview(review);
        product.addTag(tag);
        productrib.addTag(foodtag);
        // products.forEach(function(product){
        //     product.addTag(tag)
        // })
        var findingProducts = Product.findAll();
        var findingOrder = Order.findOne({
            where: {
                id: 1
            }
        })
        return Promise.all([findingOrder, findingProducts])
    })
    .spread(function(order, products){
        return order.addProducts(products)
    })
    .then(function(){
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
