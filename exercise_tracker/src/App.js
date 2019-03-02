import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Query from "./scripts/requests";
//import logo from './logo.svg';
import './css/App.css';


class Header extends Component {
  render() {
    return (
      <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="#">Navbar</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <li className="nav-item active">
        <a className="nav-link" href="#"><Link to="/">Home</Link> <span className="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
       <a class="nav-link"><Link to="/new_user">Create New User</Link></a>
      </li>
      <li className="nav-item">
       <a className="nav-link"><Link to="/search_data">Search Data</Link></a>
      </li>
     <li className="nav-item">
       <a className="nav-link"><Link to="/add_exercise">Add Excersize</Link></a>
      </li>
      <li className="nav-item">
       <a class="nav-link" href="./api_reference.html" target="_blank">API Reference</a>
      </li>
      
    </ul>
  </div>
</nav>
</div>
      );
  }
};
class SignUpForm extends Component {
   constructor (props) {
    super(props)
    this.state={
      form_data: "",
      user_list: JSON.parse(window.localStorage.getItem("user_list")) || []
    }
  }
  handleFormSubmit = () => {
   // e.preventDefault();
   
    Query.post("/new-user", {
      username: this.state.form_data
    },
    (res) => {
      if(!res.error) {
        var stored_users = JSON.parse( window.localStorage.getItem("user_list")) || [];
       
        stored_users.push({
          username: res.username,
          _id: res._id
        });
        window.localStorage.setItem("user_list", JSON.stringify(stored_users))
      }
      
    
      
      this.setState({
        form_data: "",
        res_message: !res.error ? "Added User Successfully!" : res.error,
        user_list: JSON.parse(window.localStorage.getItem("user_list")) || []
      });
      console.log("Post to /add_user successful, res: ", res);
      
    })
  }
  handleInputChange = (e) => {
    this.setState({
      form_data: e.target.value,
      user_list: JSON.parse(window.localStorage.getItem("user_list")) || []
      
    })
  }
  render() {
   
    return (

<div className='container mt-5'>
  
  <div className='col-sm-12 row mx-auto my-5'>
        <h4 className="col-sm-12 text-center">Your User list</h4>
        <div className="row text-center">
        <div 
          className='col-sm-12 border-bottom'>
          <b>Username, </b>
          <b>userId</b>
          </div>
        {this.state.user_list && this.state.user_list.length > 0 ?
        this.state.user_list.map(function(user, i) {
          return (<div 
          className='col-sm-12 border-bottom text-center'>
          <b>{user.username}, </b>
          <span>{user._id}</span>
          </div>)
        }) 
        
        : <h6 className="text-center">Add users and they will be listed here</h6>
          
        }
          
        </div>
     </div>
  

    <div className="form-group">
      <h4 className="col-sm-12 text-center">Create new user</h4>
      <h5 className="col-sm-12 text-center col-form-label">Enter username</h5>
      <div className="row col-sm-12">
        <div className="col-sm-12 col-md-8 mb-3">
          <input  type="text" class="form-control" name="username" placeholder="Username. Ex: moonlight29"
          value={this.state.form_data} 
          onChange={this.handleInputChange}/>
        </div>
        <div className="d-flex justify-content-center col-sm-12 col-md-4 mb-3">
          <button onClick={this.handleFormSubmit} type="button" className="btn btn-primary">Add User</button>
        </div>
        <span className="text-center">{this.state.res_message ? this.state.res_message : ""}</span>
      </div>
    </div>
  </div>
    );
  }
};
class NewExercise extends Component {
   constructor(props) {
    super(props)
    this.state={
      form_data: {
        userId: "",
        description: "",
        duration: 0
      }
    }
  }
  handleFormSubmit = () => {
   // e.preventDefault();
  
    Query.post("/add", this.state.form_data,
    (res) => {
      this.setState({
        form_data: {
        userId: "",
        description: "",
        duration: 0
      },
      res_message: res.error ? res.error : "Added exercise Successfully!"
      });
      console.log("Posted exercise, response: ", res);
    });
    
  }
  handleInputChange = ( input_name, e) => {
    var curr_state = this.state.form_data;
    curr_state[input_name] = e.target.value;
    this.setState({form_data: curr_state})
  }
  render() {
    return (
      <div className='container mt-5'>

  <div className="form-group">
    <h4 className="col-sm-12 text-center">Add Exercise</h4>

    <div className="col-sm-12">
      <h5 className="col-sm-12 text-center col-form-label">UserId</h5>
      <input type="text" name="useId" className="form-control" 
      value={this.state.form_data.userId}
      onChange={this.handleInputChange.bind(this, "userId")}
      />
    </div>
    <div className="col-sm-12">
      <h5 className="col-sm-12 text-center col-form-label">Description</h5>
      <input type="text" name="description" className="form-control"
       value={this.state.form_data.description}
      onChange={this.handleInputChange.bind(this, "description")}
      />
    </div>
    <div className="col-sm-12">
      <h5 className="col-sm-12 text-center col-form-label">Duration</h5>
      <input type="text" name="duration" class="form-control"
       value={this.state.form_data.duration}
      onChange={this.handleInputChange.bind(this, "duration")}
      />
    </div>
    <div className="col-sm-12">
      <h5 className="col-sm-12 text-center col-form-label">Date</h5>
      <input type="text" name="date" className="form-control" 
       placeholder="yyyy-mm-dd"
       value={this.state.form_data.date}
      onChange={this.handleInputChange.bind(this, "date")}
      />
    </div>
    <div className="col-sm-12 d-flex justify-content-center mt-4">
      <button className="btn btn-primary" onClick={this.handleFormSubmit}>Add Excersize</button>
    </div>
    <div class="text-center">{this.state.res_message ? this.state.res_message : ""}</div>
  </div>
</div>
      )
  }
};
class UserList extends Component {
  
    render() {
     
      return (
      <div>
     <h5 className='text-center'>{this.props.list_name}</h5>
     {this.props.list && this.props.list.length > 0 ? 
    <div>
      <ul className="list-group mt-4" id={this.props.list_id}>
      {this.props.list.map((list_item, i) => {
        return (<li className="list-group-item" key={i}>
          <div className="row">
            <h6 className="col-sm-12 col-md-6">{list_item.description}</h6>
            <span className="col-sm-12 col-md-6">{list_item.data}</span>
          </div>
         </li> )
      })}
     </ul>
    </div> :
    <div>
       <h6 className="text-center">No {this.props.list_name} available</h6>
       <h6 className="text-center">{this.props.message ? this.props.message: ""}</h6>
    </div>
     }
</div>
      );
    }
};
class Search extends Component {
   constructor(props) {
    super(props)
    this.state={
      search_data: {
        userId: "",
        limit: 0,
        date: "1970-01-01"
      },
      res: {}
    }
  }
  handleFormSubmit = () => {
   // e.preventDefault();
   
   Query.get("/log", this.state.search_data,
   (res) => {
     var curr_state = this.state;
     this.setState({
      search_data: curr_state.search_data,
      res: {
        data: res.exercises,
        error: res.error
      }
    })
    
     console.log("recieved response for /log response: ", res)
   })
  }
  handleInputChange = (input_name, e) => {
    var curr_state = this.state;
    curr_state.search_data[input_name] = e.target.value;
    this.setState({search_data: curr_state.search_data, res: curr_state.res || {}})
  }
  render() {
   
    return (
<div className='container mt-5'>

  <div className="form-group">
    <h4 className="col-sm-12 text-center">Get User Data</h4>
    <div className="col-sm-12 text-center">
       <span>Search for individual users</span>
    </div>
   
    <h5 className="col-sm-12 col-form-label">Enter userId</h5>
    <div className="col-sm-12 row">
      <input type="text" className="form-control col-sm-12 col-md-8" id="search_userId" placeholder="Enter userId"
      value={this.state.search_data.userId} 
      onChange={this.handleInputChange.bind(this, "userId")}
      />
      <a data-toggle="collapse" href="#search_filters" 
      role="button" aria-expanded="false" aria-controls="search_filters" 
      className="col-sm-12 col-md-2">Toggle Filters</a>
       
    </div>

    <div id="search_filters" className='collapse col-sm-12 row mt-3 py-4 border'>
    <div className="col-sm-6">
      <label><h6>Limit # of results</h6></label>
      <input type="text" className="form-control" id="search_limit" placeholder="Limit # of results. Ex: 4" 
        value={this.state.search_data.limit} 
        onChange={this.handleInputChange.bind(this, "limit")}
      />
    </div>
   
    
    <div className="col-sm-6">
        <label><h6>Filter by Date (choose date) created starting from: </h6></label>
        <input type="text" className="form-control" id="search_date" placeholder="Filter by date"
          placeholder="format: yyyy-mm-dd"
          value={this.state.search_data.date} 
          onChange={this.handleInputChange.bind(this, "date")}
        />
    </div>
    
  </div>
     <div className="col-sm-12 col-md-2 d-flex justify-content-center mt-3">
       <button type="button" class="btn btn-primary" onClick={this.handleFormSubmit}>Search</button>
    </div>
    
      <UserList
      list_name="User Excercise List" 
      list_id="excercise_list" 
      list={this.state.res.data}
      message={this.state.res.error} />

  </div>

</div>
    );
  }
};
const RouteWrapper = function(props) {
        return props.children || "";
    
};
function api_reference() {
  return (
      <div class="container mt-5">
        <h4>This is the API reference for my simple tracking app.</h4>
        <div class="container">
          <div class="col-sm-12">
            You can POST new users like this: 
            <code>https://excersize-tracker-captain-clark.c9users.io:8081/api/exercise/new-user</code>
            POST data should be JSON object like this:
            <code>
              {
              `{
              "username": "String"
              }`
                
              }
            </code>
            response on Success will be a mongoDB object with the user data:
            <code>{`{
    "_id" "5c747539109f5209556516bd",
    "exercises": [],
    "username": "John",
    "__v": 0
}`}</code>
on failure : 
<code>{`{error: "Error message"}`}</code>
<br/>
         For adding user data (an exercise) to an existing user, POST to: <br/>
         <code>https://excersize-tracker-captain-clark.c9users.io:8081/api/exercise/add</code>
         <br/>
         POST data should be JSON object like this:
            <code>
             {`{
              "userId": "mongodb _id",
              "desc": "Description"
              "duration": NUMBER,
              "date": mm-dd-yyyy
              }`
             }
            </code>
            success response gives you an object: 
            <code>{`{message: "Added user successfully"}`}</code>
            <br/>
            failure,
            <code>{`{error: "error message"}`}</code>
            <br/>
            to GET user data(exercises for a user) access endpoint: 
            <br/>
            <code>https://excersize-tracker-captain-clark.c9users.io:8081/api/exercise/log?{`{userId}&{limit}&{from}`}</code>
            where userId(mongodb _id) is required, and limit(# of exercise results) and from(results date starting from mm-dd-yyyy) are optional
            
             <br/>
            to GET complete user data users access endpoint: 
            <br/>
            <code>https://excersize-tracker-captain-clark.c9users.io:8081/api/exercise/log?{`{userId}&{limit}&{from}`}</code>
            where user(mongodb _id OR username) is optional
            <br/>
            github repo link: 
          </div>
        </div>
      </div>
    )
}
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
 addUser(user_data) {
   this.setState({user: user_data})
 }
  render() {
    return (<div>
       <SignUpForm />}
      <NewExercise />
      <Search/>
    </div>)
  }
};
class App extends Component {
 render() {
   return (
     
     <Router>
       <div className="App">
         <Header/>
        <Route exact path="/" component={Home} />
        <Route exact path="/new_user" component={SignUpForm}/>
        <Route exact path="/search_data" component={Search}/>
        <Route exact path="/add_exercise" component={NewExercise} />
        <Route exact path="/api_reference" component={api_reference} />
       </div>
     </Router>
     );
 }
};

export default App;
