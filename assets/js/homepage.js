var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


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
  
var displayRepos = function(repos, searchTerm) {
    console.log(repos);
    console.log(searchTerm);

    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
      }

    // clear old content
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    //loop over repos
    for(var i = 0; i < repos.length; i++){
        // formant repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        
        // append to container
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        // create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);
        
        // create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
        statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append to container
        repoEl.appendChild(statusEl);



        //append container to the dom
        repoContainerEl.appendChild(repoEl); 

    }

};



var getUserRepos = function(user) {
    
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    fetch(apiUrl)
        .then(function(response){
           if (response.ok) {
            response.json()
            .then(function(data){
                console.log(data);
                displayRepos(data, user);
            });
        } else {
            Alert ("Error: Github User not found");
        }
        })
        .catch(function(error){
            
        })
  };
  
  userFormEl.addEventListener("submit", formSubmitHandler);