const express = require('express')
const port = 3000
var userRoute = require('./routes/user.route');
var productRoute = require('./routes/product.route');
var storeRoute= require('./routes/store.route');
var authRoute = require('./routes/auth.route');
const cookieParser = require('cookie-parser');
const app = express()
var authMiddleware = require('./middlewares/auth.middleware')

app.set('views', './views')
app.set('view engine', 'pug')


app.use(cookieParser('dakshdksajfhdskj')) // use to read format cookie
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public'))

app.use('/users', authMiddleware.requireAuth, userRoute)
app.use('/products',authMiddleware.requireAuth, productRoute)
app.use('/stores', authMiddleware.adminAuth, storeRoute)
app.use('/auth', authRoute)

// index page 
app.get('/', function(req, res) {
    res.render('index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('about');
});

app.get('/logout', function(req, res){
	res.clearCookie("userId");
	res.redirect('/')
})


app.listen(port, () => console.log('Example app listening at http://localhost:' + port))