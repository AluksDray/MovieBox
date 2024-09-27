let searchedMovie = document.getElementById("search-input");
let movieContainer = document.getElementById("movie-container")
let backArrow = document.getElementById("back")
let searchBtn = document.getElementById("btn")
let form = document.getElementById("search")
let logOutCTA = document.getElementById("log-out")
let logOutModal = document.getElementById("modal")
let confirmLogOut = document.getElementById("logout-confirm")
let cancelLogOut = document.getElementById("logout-cancel")

let movieArray = []

// search button listener
searchedMovie.addEventListener("click", clickSearch)
function clickSearch(event){
    movieContainer.style.visibility = "hidden"
    backArrow.style.visibility = "visible"

    backArrow.addEventListener("click", returnToHomepage)
    function returnToHomepage(){
        movieContainer.style.visibility = "visible"
        backArrow.style.visibility = "hidden"
    }

    event.preventDefault()
}

// modal visibility
logOutCTA.addEventListener("click", logOut)
function logOut(event){
    logOutModal.style.visibility = "visible"
}

// confirming logOut
confirmLogOut.addEventListener("click", logOutConfirmed)
function logOutConfirmed(event){
    window.location.href = `movielogin.html`
}

// canceling LogOut
cancelLogOut.addEventListener("click", logOutCancelled)
function logOutCancelled(event){
    logOutModal.style.visibility = "hidden"
}

searchBtn.addEventListener("click", submitRequest)
function submitRequest(event){
    event.preventDefault()
    let movieEntered = searchedMovie.value.trim();

    if(movieEntered){
        window.location.href = `moviesearch.html?query=${encodeURIComponent(movieEntered)}`;
    }

    let movieLiteral = {
        movieName : movieEntered
    };

    movieArray.push(movieLiteral);
    localStorage.setItem("storedMovie", JSON.stringify(movieArray))

    form.reset()
    fetchMovieResult(movieEntered)
}