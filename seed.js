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
        },
        {
            email: 'zeke@zeke.zeke',
            password: '123'
        },
        {
            email: 'alfonso@gmail.com',
            password: '69'
        },
        {
            email: 'coldshower@gmail.com',
            password: 'hotshower',
            isAdmin: true
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
            imageUrls: ['https://s-media-cache-ak0.pinimg.com/736x/fd/56/55/fd5655d3f79a5000b17852c3965e916c.jpg'],
            price: 10.99,
            brand: 'OneSockMan',
            description: 'Selfies XOXO gluten-free synth, man braid meggings DIY vinyl echo park pabst. Cornhole art party blue bottle kogi normcore pickled, roof party chillwave beard venmo. Jean shorts organic kale chips, vinyl listicle meggings butcher green juice selvage scenester vegan hella. Kickstarter hoodie meggings banh mi gluten-free. Viral butcher farm-to-table etsy 8-bit. Squid man braid viral ennui. Seitan keffiyeh craft beer cred blog, kinfolk fixie.',
            quantity: 100
        },
        {
            name: 'North Face Glove',
            imageUrls: ['http://www.sportsauthority.com/graphics/product_images/pTSA-15061572p275w.jpg'],
            price: 50.99,
            brand: 'The North Face',
            description: 'Waistcoat swag art party 3 wolf moon, chicharrones seitan stumptown beard church-key chillwave literally sriracha. Poutine four dollar toast paleo cornhole, semiotics lumbersexual cold-pressed vice meditation pour-over whatever helvetica wayfarers yuccie. Beard vinyl man braid, tilde scenester cold-pressed narwhal vice street art hoodie raw denim etsy freegan. Shabby chic disrupt heirloom, church-key banh mi pinterest tattooed. Mustache cardigan brooklyn, bicycle rights dreamcatcher actually readymade leggings asymmetrical four loko selfies you probably haven\'t heard of them XOXO umami. VHS sartorial hoodie fixie, meh letterpress direct trade health goth retro neutra raw denim pickled distillery. Bespoke tilde kale chips lo-fi blog pabst cardigan four dollar toast ugh, seitan cray.',
            quantity: 100
        },
        {
            name: 'One Rib',
            imageUrls: ['https://i.ytimg.com/vi/E33RegW85yM/hqdefault.jpg'],
            price: 0.25,
            brand: 'Applebees',
            description: 'Craft beer bespoke post-ironic gochujang direct trade shabby chic, tacos humblebrag fashion axe mlkshk twee typewriter chillwave meggings. Umami sriracha paleo post-ironic, blue bottle lumbersexual kickstarter mustache squid pork belly skateboard taxidermy. Echo park beard 90\'s tumblr you probably haven\'t heard of them 8-bit. Actually pabst 90\'s, chambray helvetica food truck kinfolk seitan typewriter raw denim. Crucifix irony pug, kogi seitan chia salvia intelligentsia letterpress green juice distillery. Godard tumblr shoreditch, kale chips swag pork belly fixie master cleanse aesthetic. Occupy neutra banh mi, four dollar toast roof party twee poutine biodiesel sartorial bushwick literally cronut keytar.',
            quantity: 5
        },
        {
            name: 'Chicken Wing (Drummette)',
            imageUrls: ['http://img1.21food.com/img/cj/2014/10/8/1412770556005517.jpg'],
            price: 0.25,
            brand: 'BBQ Palace',
            description: 'Actually fixie locavore sustainable, occupy viral shoreditch narwhal. Blog austin hella, chambray etsy swag trust fund kombucha pop-up godard slow-carb sustainable. Fingerstache messenger bag ennui cardigan. Try-hard ethical master cleanse lumbersexual authentic, green juice yuccie artisan pabst PBR&B. Scenester etsy tacos church-key, aesthetic kinfolk poutine. Williamsburg church-key narwhal deep v banjo green juice, brunch locavore truffaut. Etsy banjo chia post-ironic plaid, sartorial pork belly stumptown yr four dollar toast.',
            quantity: 2
        },
        {
            name: 'Kit (not Kat)',
            price: 1.49,
            brand: 'Nestle',
            description: 'Man bun dreamcatcher mustache, ethical 3 wolf moon vinyl blue bottle keffiyeh butcher salvia banh mi. Franzen stumptown messenger bag shoreditch trust fund. Tumblr mixtape gochujang pabst heirloom, fanny pack synth pork belly gentrify. Lomo ugh sriracha freegan. Blog microdosing mustache lomo swag photo booth, franzen kogi irony 3 wolf moon bespoke narwhal trust fund flexitarian. Forage mixtape asymmetrical locavore selvage brunch artisan. YOLO direct trade quinoa sriracha, selvage etsy asymmetrical gentrify +1 gluten-free tattooed readymade.',
            quantity: 20
        },
        {
            name: 'Page 267 of The Catcher In The Rye',
            imageUrls: ['https://mrtheriaultfvhs.files.wordpress.com/2013/02/catcher.jpg'],
            price: 6.89,
            brand: 'Book Inc',
            description: 'XOXO godard farm-to-table sustainable brunch skateboard next level food truck literally. Chicharrones echo park four loko gluten-free lumbersexual. Crucifix cray church-key slow-carb, humblebrag knausgaard fap post-ironic. Brooklyn post-ironic viral, mixtape intelligentsia portland irony hoodie pitchfork cray cronut distillery. Kale chips squid williamsburg, hammock hashtag stumptown 3 wolf moon you probably haven\'t heard of them pour-over migas beard. Meh ethical occupy shabby chic, viral wayfarers four loko vinyl artisan freegan austin typewriter. Salvia single-origin coffee bicycle rights taxidermy, godard fingerstache kogi sustainable mumblecore cold-pressed mixtape echo park health goth chicharrones.',
            quantity: 201
        },
        {
            name: 'Puzzle Piece',
            imageUrls: ['https://s-media-cache-ak0.pinimg.com/736x/c1/95/82/c1958241e76e1c2244025e379d1d4755.jpg','http://www.clker.com/cliparts/m/X/8/K/3/u/jigsaw-white-puzzle-piece-large-md.png'],
            price: 17.99,
            brand: 'Mattel',
            description: 'Mlkshk umami cold-pressed quinoa locavore, lo-fi semiotics. Shoreditch tofu shabby chic ethical cold-pressed. Flexitarian mustache actually, gentrify heirloom authentic shabby chic disrupt poutine chillwave mumblecore pickled gochujang lo-fi retro. Shabby chic vinyl kogi, iPhone four loko cardigan chartreuse readymade hashtag literally cornhole +1 mustache banh mi bushwick. Asymmetrical YOLO fap pinterest. Dreamcatcher banjo franzen migas tilde vinyl four loko butcher trust fund, tofu cold-pressed yuccie keytar typewriter. Shabby chic green juice neutra next level 3 wolf moon, occupy viral hoodie direct trade.',
            quantity: 0
        },
        {
            name: 'Chess Piece (Bishop)',
            imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/b/ba/Chess_piece_-_Black_bishop.JPG','http://www.agentsofguard.com/wp-content/uploads/2015/06/chess-bishop-white-risk.jpg'],
            price: 8.14,
            brand: 'Mattel',
            description: 'Seitan migas fingerstache knausgaard cred squid. Locavore swag etsy XOXO truffaut quinoa man bun deep v. Austin chartreuse YOLO, polaroid pug 8-bit migas meh next level knausgaard tacos four dollar toast portland hashtag. Art party selvage cronut DIY, salvia before they sold out knausgaard hella master cleanse. Distillery chartreuse pug, normcore meditation swag irony hashtag austin art party trust fund godard lomo vice umami. Master cleanse cronut venmo 90\'s, shoreditch pop-up shabby chic humblebrag fingerstache selvage. Flannel man braid marfa, offal distillery kombucha shabby chic four dollar toast hoodie authentic man bun godard art party.',
            quantity: 8
        },
        {
            name: 'Single Cufflink (Left)',
            imageUrls: ['https://upload.wikimedia.org/wikipedia/commons/d/d4/Cuff-French_round.jpg'],
            price: 29.99,
            brand: 'Gucci',
            description: 'Dreamcatcher vice kombucha kale chips, narwhal hammock bushwick art party knausgaard messenger bag gochujang banh mi cray YOLO. Try-hard fap brunch, bespoke narwhal vegan pickled retro art party cronut. Salvia roof party schlitz, sriracha pabst XOXO keytar biodiesel asymmetrical mixtape readymade. VHS wayfarers kombucha etsy truffaut slow-carb. Wolf small batch shoreditch etsy drinking vinegar, taxidermy tattooed pinterest viral chartreuse 8-bit typewriter. Stumptown four dollar toast kogi sriracha, 8-bit yuccie seitan. Health goth knausgaard VHS hoodie pitchfork, hashtag retro flexitarian plaid ethical chambray gluten-free disrupt beard typewriter.',
            quantity: 90
        },
        {
            name: 'Single Ski (Right)',
            imageUrls: ['http://static.bootic.com/_pictures/1404312/salomon-xw-tornado-z12.jpg'],
            price: 55.89,
            brand: 'Billabong',
            description: 'Bitters quinoa cray skateboard, church-key venmo brooklyn next level twee pop-up banh mi try-hard 3 wolf moon mlkshk hoodie. Viral celiac kale chips mixtape keytar. Lumbersexual taxidermy keytar heirloom bicycle rights tilde artisan pop-up. Kinfolk hella tumblr sustainable twee tilde. Hashtag normcore selvage ramps, craft beer schlitz kale chips irony before they sold out bushwick butcher cold-pressed shoreditch brooklyn messenger bag. Bushwick forage kickstarter, fingerstache tousled shoreditch thundercats lumbersexual semiotics. Tofu ethical humblebrag, tote bag freegan williamsburg man braid cliche neutra mustache.',
            quantity: 10
        }
    ];

    var creatingProducts = products.map(function(productObj){
        return Product.create(productObj);
    });

    return Promise.all(creatingProducts);
};

var seedTags = function(){
    var tags = [
        {
            category: 'clothing'
        },
        {
            category: 'food'
        },
        {
            category: 'toys'
        },
        {
            category: 'books'
        },
        {
            category: 'miscellaneous'
        }
    ];

    var creatingTags = tags.map(function(tagObj){
        return Tag.create(tagObj);
    });

    return Promise.all(creatingTags);
};

// var seedReviews = function() {
//     var reviews = [
//         {
//             rating: 4,
//             comment: 'Etsy gluten-free ethical man bun, banjo actually cray brooklyn plaid farm-to-table. Pug vice farm-to-table etsy ugh humblebrag, echo park gastropub man bun slow-carb pitchfork ramps kitsch lo-fi YOLO. Kitsch affogato tote bag tousled, mlkshk blue bottle yr leggings tacos umami VHS. Freegan put a bird on it listicle, chia offal before they sold out church-key. Literally chartreuse XOXO brooklyn, waistcoat slow-carb squid pour-over retro distillery franzen yr paleo. Blog biodiesel kogi, shabby chic keytar tilde kinfolk chillwave helvetica +1 ugh. Typewriter humblebrag kale chips drinking vinegar seitan mumblecore flannel beard, tilde +1 man braid scenester occupy hammock.'
//         }
//     ]

//     var creatingReviews = reviews.map(function(reviewObj){
//         return Review.create(reviewObj)
//     })

//     return Promise.all(creatingReviews)
// }

db.sync({ force: true })
    .then(function () {
        return Promise.all([seedUsers(), seedProducts(), seedTags()]);
    })
    .then(function(){

        var findingSock = Product.findOne({
            where: {
                name: 'Sock'
            }
        });
        var findingGlove = Product.findOne({
            where: {
                name: 'North Face Glove'
            }
        });
        var findingChicken = Product.findOne({
            where: {
                name: 'Chicken Wing (Drummette)'
            }
        });
        var findingKit = Product.findOne({
            where: {
                name: 'Kit (not Kat)'
            }
        });
        var findingBook = Product.findOne({
            where: {
                name: 'Page 267 of The Catcher In The Rye'
            }
        });
        var findingPuzzle = Product.findOne({
            where: {
                name: 'Puzzle Piece'
            }
        });
        var findingChess = Product.findOne({
            where: {
                name: 'Chess Piece (Bishop)'
            }
        });
        var findingCuff = Product.findOne({
            where: {
                name: 'Single Cufflink (Left)'
            }
        });
        var findingSki = Product.findOne({
            where: {
                name: 'Single Ski (Right)'
            }
        });

        var findingRib = Product.findOne({
            where: {
                name: 'One Rib'
            }
        });

        var findingClothes = Tag.findOne({
            where: {
                category: 'clothing'
            }
        });

        var findingFood = Tag.findOne({
            where: {
                category: 'food'
            }
        });
        var findingToys = Tag.findOne({
            where: {
                category: 'toys'
            }
        });
        var findingMisc = Tag.findOne({
            where: {
                category: 'miscellaneous'
            }
        });
        var findingBooks = Tag.findOne({
            where: {
                category: 'books'
            }
        });

        return Promise.all([findingSock, findingGlove, findingChicken, findingKit, findingBook, findingPuzzle, findingChess,findingCuff, findingSki, findingRib, findingClothes, findingFood, findingToys, findingMisc, findingBooks])
    })
    .spread(function (sock, glove, chicken, kit, book, puzzle, chess, cuff, ski, rib, clothes, food, toys, misc, books) {
        return Promise.all([sock.addTag(clothes), glove.addTag(clothes),chicken.addTag(food),kit.addTag(food),book.addTag(books),puzzle.addTag(toys),chess.addTag(toys),cuff.addTag(clothes),ski.addTag(misc),rib.addTag(food)]);
    })
    .then(function(){
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    })
    .catch(function (err) {
        console.error(err);
        process.kill(1);
    });
