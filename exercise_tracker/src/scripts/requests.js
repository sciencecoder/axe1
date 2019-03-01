const baseUrl = "https://excersize-tracker-captain-clark.c9users.io:8081/api/exercise"
var requests = {
  post: function(path, data, callback) {
    // The parameters we are gonna pass to the fetch function
    let fetchData = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
            // "Content-Type": "application/x-www-form-urlencoded",
      }
       //mode: "cors", // no-cors, cors, *same-origin
        //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
       // credentials: "same-origin", // include, *same-origin, omit
        //redirect: "follow", // manual, *follow, error
        //referrer: "no-referrer", // no-referrer, *client
    };
    
    window
      .fetch(baseUrl + path, fetchData)
      .then(function(response) {
        return response.json();
        // Handle response you get from the server
      })
      .then(function(res) {
        callback(res);
        //if(!data.error) {
        // }
      });
  },
  get: function(path, data, callback) {
    var url = `${baseUrl}${path}`;
   var params = "?";
  for(let key in data) {
    params+=`&${key}=${data[key]}`
  }
  url += params;
  window.fetch(url, {
    method: "GET" // *GET, POST, PUT, DELETE, etc.
  })
    .then(response => response.json()) // parses response to JSON
    .then(res => {
        
        callback(res);
    })
    .catch(error => console.error(error));
  }
};


export default requests;