var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');


const userSchema=new Schema({
    title: {
        type: String,
        default:''
    },
    type:{
        type:String,
        default:"general"
    },
    description: {
        type: String,
        default:''
    },
    url: {
        type: String,
        default:''
    },
    urlToImage: {
        type: String,
        default:''
    },
    publishedAt: {
        type: String,
        default:''
    },
    content: {
        type: String,
        default:''
    },
    comments:[{
        comment:{
            type:String,
            default:'',
        },
        author:{
            type:String,
            default:'',
        }
    }]
})


module.exports=mongoose.model('News',userSchema);