const express = require('express')
const port = 3000
var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');
var storeRoute= require('./routes/store.route');
var authRoute = require('./routes/auth.route');
var cartRoute = require('./routes/cart.route');
//const cookieParser = require('cookie-parser');
var session = require('express-session')
const app = express()
var authMiddleware = require('./middlewares/auth.middleware')

app.set('views', './views')
app.set('view engine', 'pug')

//app.use(cookieParser('dakshdksajfhdskj')) // use to read format cookie
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static('public'))
app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use('/users', authMiddleware.adminAuth, userRoute)
app.use('/products',authMiddleware.requireAuth, productRoute)
app.use('/stores', authMiddleware.adminAuth, storeRoute)
app.use('/auth', authRoute)
app.use('/cart',authMiddleware.requireAuth, cartRoute)
// index page 
app.get('/', function(req, res) {
    //console.log(req.session)
    res.render('index');
});

app.get('/logout', function(req, res){
	res.clearCookie("connect.sid");
	res.redirect('/')
})


app.listen(port, () => console.log('Example app listening at http://localhost:' + port))