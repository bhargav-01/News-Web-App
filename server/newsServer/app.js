var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var cors =require('cors')
var cron=require('node-cron');
const axios = require('axios');
var config = require('./config');
////////////////////////////////////
var passport = require('passport');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var newsRouter = require('./routes/newsRouter')

////////////////////////////////////////////////////////////////////////

const uri = config.mongoUrl;
const connect=mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true});

connect.then((db) => {
  console.log("Connected correctly to server");
}, (err) => { console.log(err); });


var app = express();
app.use(cors());
app.use(cookieParser('12345-67890-09876-54321'));

app.use(session({
  name: 'session-id',
  secret: '12345-67890-09876-54321',
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}));
app.use(passport.initialize());
app.use(passport.session());


app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/users', usersRouter);


app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


var cronJob = cron.schedule("0 * * * *", function(){
        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/general/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                    title:news.title,
                    description: news.description,
                    url:news.url,
                    urlToImage:news.urlToImage,
                    type:"general",
                    publishedAt:news.publishedAt,
                    content:news.title,
                })
                .catch(error => {
                    console.log("fefeffrefrfr",error);
                });
            })
        }).catch(error => {});

        
        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                      title:news.title,
                      description: news.description,
                      url:news.url,
                      urlToImage:news.urlToImage,
                      type:"technology",
                      publishedAt:news.publishedAt,
                      content:news.title,
                })
                .catch(error => {
                    console.log(error);
                });
            })
        }).catch(error => {});

        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/sports/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                      title:news.title,
                      description: news.description,
                      url:news.url,
                      urlToImage:news.urlToImage,
                      type:"sports",
                      publishedAt:news.publishedAt,
                      content:news.title,
                })
                .catch(error => {
                    console.log(error);
                });
            })
        }).catch(error => {});

        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/science/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                      title:news.title,
                      description: news.description,
                      url:news.url,
                      urlToImage:news.urlToImage,
                      type:"science",
                      publishedAt:news.publishedAt,
                      content:news.title,
                })
                .catch(error => {
                    console.log(error);
                });
            })
        }).catch(error => {});

        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/health/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                      title:news.title,
                      description: news.description,
                      url:news.url,
                      urlToImage:news.urlToImage,
                      type:"health",
                      publishedAt:news.publishedAt,
                      content:news.title,
                })
                .catch(error => {
                    console.log(error);
                });
            })
        }).catch(error => {});

        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/business/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                      title:news.title,
                      description: news.description,
                      url:news.url,
                      urlToImage:news.urlToImage,
                      type:"business",
                      publishedAt:news.publishedAt,
                      content:news.title,
                })
                .catch(error => {
                    console.log(error);
                });
            })
        }).catch(error => {});

        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/entertainment/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                      title:news.title,
                      description: news.description,
                      url:news.url,
                      urlToImage:news.urlToImage,
                      type:"entertainment",
                      publishedAt:news.publishedAt,
                      content:news.title,
                })
                .catch(error => {
                    console.log(error);
                });
            })
        }).catch(error => {});  
        
        axios.get("https://saurav.tech/NewsAPI/top-headlines/category/technology/in.json")
          .then(response => {
            Object.entries(response.data.articles).forEach(([key,news])=>{
                  axios.post("http://localhost:3001/news/",{
                      title:news.title,
                      description: news.description,
                      url:news.url,
                      urlToImage:news.urlToImage,
                      type:"technology",
                      publishedAt:news.publishedAt,
                      content:news.title,
                })
                .catch(error => {
                    console.log(error);
                });
            })
        }).catch(error => {});  
  console.log('cron job completed');
}); 

cronJob.start()
///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
