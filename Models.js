var mongoose =require("mongoose")

var UserSchema = mongoose.Schema({
    username: String,
    exercises: Array
})
module.exports = {User: mongoose.model("Excercise_Tracker_Users", UserSchema)}