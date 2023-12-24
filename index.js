require("dotenv").config();

const connectDB = require('./connectDB')

const cors = require("cors");
const express= require("express")

const Anime= require('./models/Anime')
const multer = require("multer");
const app= express();



const PORT = process.env.PORT || 8000;
connectDB();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use("/uploads",express.static("uploads"));

//anime page

app.get('/api/anime',async(req,res)=>{
    const category= req.query.category;
    const filter={};
    if(category){
        filter.category= category;
    }

    try{
        
        const data= await Anime.find(filter);
        res.json(data);

         
    }catch(error){
             res.status(500).json({error:"An Error has occured while fetching"})
    }
   // res.json("HEllo mate");
})



//to fetch  single anime page
app.get('/api/anime/:slug',async(req,res)=>{
 
    const slugParam= req.params.slug;

    try{
        
        const data= await Anime.findOne({slug: slugParam});
        res.json(data);

         
    }catch(error){
             res.status(500).json({error:"An Error has occured while fetching"})
    }
   // res.json("HEllo mate");
})


//to post the new anime details

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


app.post('/api/anime',upload.single("thumbnail"),async(req,res)=>{
    try{

     console.log(req.body);
     console.log(req.file);
     const newAnime= new Anime({
        title: req.body.title, 
        slug: req.body.slug,
        stars: req.body.stars,
        description : req.body.description,
        category : req.body.category,
        thumbnail : req.file.filename,
     })

     await Anime.create(newAnime);
     res.status(202).json("Data submitted to the backend"); 

    }catch(error){
        res.status(500).json({error:"An error has occured while posting"})
    }
})



//to update the anime details

app.put('/api/anime',upload.single("thumbnail"),async(req,res)=>{
    try{



        const animeId= req.body._id;
        
        
  
     const updateAnime={
        title: req.body.title, 
        slug: req.body.slug,
        stars: req.body.stars,
        description : req.body.description,
        category : req.body.category,
     }


     if(req.file){
                 updateAnime.thumbnail= req.file.filename;
     }
     await Anime.findByIdAndUpdate(animeId ,updateAnime);
     res.status(202).json("Data submitted to the backend"); 

    }catch(error){
        res.status(500).json({error:"An error has occured while posting"})
    }
})





// to delete a particular anime from the menu

app.delete("/api/anime/:id", async(req,res)=>{
   

    const animeId= req.params.id;
    try{
        await Anime.deleteOne({_id:animeId});
        res.json("How dare You!"+req.body._id);
    }catch(error){
        res.json(error);
    }
})



app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
})
