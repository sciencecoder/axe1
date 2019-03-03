const express = require('express');
const bodyParser = require('body-parser');
const api_routes = require("./routes.js");
var cors = require("cors");
const path = require('path');
const app = express();
//when running the dev api server,set process.env.PORT to 8081 
//because webpack runs react on the default port,  8080
//to set port, run terminal command: export env PORT=8081 PORT
const port = 8081;
//console.log(process.env.DB_CONN)

app.use(cors());

/*app.use(function(req, res, next) {
  console.log("req.body", req.body);
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(express.static('./excersize_tracker/public'))
app.listen(port, () => console.log(`Listening on port ${port}`));
app.get('/', (req, res) => {
  res.send({ express: 'Hello From Express' });
});
app.use("/api/exercise", api_routes)


/*
Notes
webpack react server could use proxy to automatically route apis to correct srver port example(in package.json): 
"proxy": "https://localhost:8081"
using port 80 removes :{PORTNUMBer} from url, nodejs server is separate from front end app server
,*/
