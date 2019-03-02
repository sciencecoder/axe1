var express = require('express');
var bodyParser = require("body-parser");
var router = express.Router();
var mongoose = require("mongoose");
var models = require("./Models")
mongoose.connect("mongodb://nur:jrxCiZu6SWD5vrX@ds044577.mlab.com:44577/deep_learning",
{useNewUrlParser: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("Mongoose/ Mongodb database connected")
});

/*
//all server responses should have message or error keys, and sometimes data keys
// middleware that is specific to this router
/*router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})*/
// define the home page route

router.get('/', function (req, res) {
  res.send('api router home page')
});
router.post('/new-user', function (req, res) {
  //Should check if username pre-exists
  models.User.findOne({username: req.body.username}, function(err, user) {
    if (err) console.error(err);
    console.log(req.body, user)
    if(user) {
      res.status(500).send({error: "Username already exists", data: user})
    }
    else if(!user && req.body.username) {
      var new_user = new models.User({username: req.body.username, exercises: []});
       new_user.save(function (err, user) {
       if (err) return console.error(err);
       res.send(user)
       console.log("saved data to db", user)
    });
    }
   else if(!req.body.username) {
     res.status(500).send({error: "Must include username in req.body"})
   }
  })
  
});
router.post("/add", function(req, res) {
  if(req.body.userId) {
     models.User.findOne({_id: req.body.userId}, function(err, user) {
     if(err) console.error(err);
     if(user) {
      let new_exercise = {
      description: req.body.description || "",
      duration: req.body.duration || 0,
      date: new Date(req.body.date) || new Date(),
      }
      models.User.updateOne({_id: req.body.userId},
      {$push: {exercises: new_exercise}},
      function(err, user) {
      if (err) console.error(err);
      res.send({message: "Posted new excersize Successfully"});
      //console.log("exercise added")
      });
     }
     else if(!user) {
       res.status(500).send({error: "Cannot find user with id " + req.body.userId})
     }
   });
  }
  else if(!req.body.userId) {
    res.status(500).send({error: "userId required"})
  }
 
})
router.get("/log", function(req, res) {
  let queries = req.query;
  if(queries.userId) {
     models.User.findOne({_id: queries.userId}, function (err, user) {
    if (err) console.log(err);
    //apply limit(Int) and from (Date) query params
  
    if(user) {
      
      user.exercises = user.exercises
      .slice(0, ((queries.limit && parseInt(queries.limit) > 0) ? parseInt(queries.limit) : false) || user.exercises.length)
      .filter((obj, i) => queries.from ? obj.date.getTime() >= new Date(queries.from).getTime() : true);
      
      res.send(user);
      console.log("Filtered documents", user);
    
    }
    else if(!user) {
      res.status(500).send({error: "cannot find user data log for id " + queries.userId})
    }
    })  
  }
  else {
     models.User.find(function (err, users) {
    if (err) console.error(err);
    res.send({
      error: "userId required in url parameters. Cannot find userId in req.query",
      data: users
    });
  
    console.log("No user id specified. User list", users);
    })
  }
 
});

router.get("/users", function(req, res) {
  let queries = req.query;
  
  if(queries.user) {
     models.User.find(
       {$or:[
         {'_id': new mongoose.Types.ObjectId(queries.user.length < 12 ? "000000000000" : queries.user) },
         {'username': queries.user }
       ]},
     function (err, users) {
    if (err) console.log(err);
    //apply limit(Int) and from (Date) query params
  
    if(users) {
      res.send(users);
      console.log("Filtered documents", users);
    
    }
    else if(!users) {
      res.status(500).send({error: "Cannot find users"})
    }
    })  
  }
  else {
     models.User.find(function (err, users) {
    if (err) console.error(err);
    res.send(users);
    })
  }
 
});

module.exports = router;