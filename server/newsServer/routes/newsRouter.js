var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var authenticate = require('../authenticate');
var passport = require('passport');
var News=require('../models/news');
const { count } = require('../models/user');

const newsRouter= express.Router();
newsRouter.use(bodyParser.json());


newsRouter.post('/',(req,res,next)=>{
    
    News.find({"title":req.body.title}).then((temp)=>{
        console.log(req.body.title);
        if(temp==null || temp.length==0)
        {
            News.create(req.body);
        }
    });
})

newsRouter.route('/comments/:newsId')
.get((req,res,next)=>{
    News.findById(req.params.newsId)
    .then((comments)=>{            
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(comments);
    }, (err) => next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
    News.findById(req.params.newsId)
    .then((news) => {
        if (news!= null) {
            console.log(req.body)
            news.comments.push(req.body);
            news.save().then((news) => {
                console.log(req.body)
                News.findById(news._id)
                .then((news) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(news);
                })            
            }, (err) => next(err));
        }
        else {
            err = new Error('News ' + req.params.dishId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})

newsRouter.route('/general')
.get((req,res,next)=>{
    News.find({type:"general"})
    .then((news)=>{     
        news.sort(function(a,b){
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);
    }, (err) => next(err))
})

newsRouter.route('/health')
.get((req,res,next)=>{
    News.find({type:"health"})
    .then((news)=>{    
        news.sort(function(a,b){
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });        
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);
    }, (err) => next(err))
})

newsRouter.route('/science')
.get((req,res,next)=>{
    News.find({type:"science"})
    .then((news)=>{       
        news.sort(function(a,b){
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });     
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);
    }, (err) => next(err))
})

newsRouter.route('/sports')
.get((req,res,next)=>{
    News.find({type:"sports"})
    .then((news)=>{      
        news.sort(function(a,b){
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });      
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);
    }, (err) => next(err))
})

newsRouter.route('/entertainment')
.get((req,res,next)=>{
    News.find({type:"entertainment"})
    .then((news)=>{      
        news.sort(function(a,b){
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });      
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);
    }, (err) => next(err))
})

newsRouter.route('/business')
.get((req,res,next)=>{
    News.find({type:"business"})
    .then((news)=>{      
        news.sort(function(a,b){
            return new Date(b.publishedAt) - new Date(a.publishedAt);
          });      
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);
    }, (err) => next(err))
})

newsRouter.route('/technology')
.get((req,res,next)=>{
    news.sort(function(a,b){
        return new Date(b.publishedAt) - new Date(a.publishedAt);
      });
    News.find({type:"technology"})
    .then((news)=>{            
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(news);
    }, (err) => next(err))
})


module.exports=newsRouter