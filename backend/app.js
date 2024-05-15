const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

const AppError = require('./utils/appError');

const authRoutes = require('./routes/auth.routes');
const categoryRoutes = require('./routes/category.routes');
const productRoutes = require('./routes/product.routes');
const userAddressRoutes = require('./routes/address.routes');
const reviewRoutes = require('./routes/review.routes');
const couponRoutes = require('./routes/coupons.routes');
const userRoutes = require('./routes/user.routes');


const app = express();

app.use(cors());

// SET Security HTTP Headers
app.use(helmet());

//Limits requests from same API
const limiter = rateLimit({
    max: 1000,
    windowMs: 60 * 60 * 1000,
    mesaage: 'Too many requests from this IP, Please try again in an hour!'
});
app.use('/api', limiter);


app.use(express.json({ limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xssClean());

// Prevent parameter pollution
app.use(hpp());

app.use(express.static(`${__dirname}/public`));  //run static html files in browser

// app.use((req, res, next) =>{
//     console.log('Hello from the middleware :) :(');
//     next();
// });

// app.use((req, res, next) =>{
//     req.requestTime = new Date().toISOString();
//     next();
// });


//ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);
app.use('/api/v1/user/address', userAddressRoutes);
app.use('/api/v1/review', reviewRoutes);
app.use('/api/v1/coupon', couponRoutes);
app.use('/api/v1/user', userRoutes);



//404 - page not found 
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});



module.exports = app;
