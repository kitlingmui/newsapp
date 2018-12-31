var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");


var db = require("./models");
var PORT = process.env.PORT || 3000;
var app = express();



app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI);

// Connect to the Mongo DB
// mongoose.connect("mongodb://localhost/newsapps", { useNewUrlParser: true });

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
          var a = 0
          axios.get("https://www.nytimes.com/section/us").then( r => {
            var $ = cheerio.load(r.data)      
            $("li.css-ye6x8s").each(function (i, element){ 

                var result = {}
                a = a + 1
                result.id = a
                result.title = $(element).find("h2").text();
                result.summary = $(element).find("p").text();
                result.url  = "https://www.nytimes.com" +  $(element).find("a").attr("href");

                // clear all existing article in mongodb
                db.Article.deleteMany({})
                .then(function() {
                })
                .catch(function(err) {
                    console.log(err)
                    res.send(err);
                });

                // create latest grapped article in mongodb
                db.Article.create(result)
                .then(function(dbArticle){             
                })
                .catch(function(err){
                    console.log(err)
                })        
            
            })
            })
        res.send('Scrape Complete')
});


// create data in Saved db
app.post("/savedarticle", function (req, res){
    db.Saved.create(req.body )
    .then(function(dbSaved){             
    })
    .catch(function(err){
        console.log(err)
    })   
 })


// get current grap article from mongodb
app.get("/read", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({}).sort({id:1})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

// get saved article from mongodb
app.get("/readsaved", function(req, res) {

    // Grab every document in the Articles collection
    db.Saved.find({})
      .then(function(dbSaved) {
        res.json(dbSaved);
      })
      .catch(function(err) {
        res.json(err);
      });
  });  

// get particular article by id
app.get("/articles/:id", function(req, res) {
    db.Article.findOne({ id: req.params.id})
    .then(function(dbArticle) {        
         res.json(dbArticle);

      })
      .catch(function(err) {
        res.json(err);
      });       
})


  
// Start the server
app.listen(PORT, function() {console.log("App running on port " + PORT);})