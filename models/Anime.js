
const mongoose= require('mongoose');

const Schema= mongoose.Schema;

const AnimeSchema= new Schema({
    title: {
        type : String,
        reuired : true
    },
    slug: {
        type : String,
        //reuired : true
    },
    description: {
        type : String,
        //reuired : true
    },
    thumbnail: {
        type : String,
        //reuired : true
    },
    stars: {
        type : Number,
       // reuired : true
    },
    category:{
        type : Array
        //require: true
    },
    createdAt: {
        type : Date,
        default : Date.now()
       // reuired : true
    }
})
module.exports= mongoose.model('Anime',AnimeSchema);