var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");



var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if(username){
        getUserRepos(username);
        nameInputEl.value= "";
    }
    else{
        alert("please enter a GitHub usersname");
    }
  };
  


var getUserRepos = function(user) {
    
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
        .then(function(response){
            response.json()
            .then(function(data){
                console.log(data);
            });
        });
  };
  
  userFormEl.addEventListener("submit", formSubmitHandler);