let displayUI = document.getElementById("display-container")
let backKey = document.getElementById("back-arrow")
let logOutCTA = document.getElementById("log-out")
let logOutModal = document.getElementById("modal")
let confirmLogOut = document.getElementById("logout-confirm")
let cancelLogOut = document.getElementById("logout-cancel")

backKey.addEventListener("click", backToPreviousPage)
function backToPreviousPage(event){
    window.location.href = `movie.html`
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



function getRequestedMovie(movieEntered) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("query");
}

function fetchMovieResult (movieEntered){
    const movieRequest = new XMLHttpRequest()
    let key = "9b80f18e47db937bb7fba28aa81c2fc2";
    movieRequest.open("GET", `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${encodeURIComponent(movieEntered)}`);
    
    movieRequest.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            let movieData = JSON.parse(this.responseText)
            console.log(movieData);
            
            displayToUi(movieData.results)
        }
    }



    movieRequest.send()
}

function displayToUi(movies){
    displayUI.innerHTML = "";
    if(movies.length === 0){
        displayUI.innerHTML = "<p>No results found.</p>";
        return;
    }

    movies.forEach(function(movie){
        displayUI.innerHTML = ``
            let movieImage = movie.poster_path
            let movieTitle = movie.title
            let movieOverview = movie.overview
            let movieVote = movie.Vote_average
            let moviePopularity = movie.popularity
            let movieReleaseDate = movie.release_date
        

        let moviePosterCont = document.createElement("div");
        moviePosterCont.classList.add("display-poster");

        let movieImg = document.createElement("img")
        if (movieImage){
            movieImg.src = `https://image.tmdb.org/t/p/w500${movieImage}`
        } else {
            movieImg.src = "path/to/default-image.jpg"
        }

        let movieRatingsDescripCont = document.createElement("div")
        movieRatingsDescripCont.classList.add("ratings-description");

        let titleOfMovie = document.createElement("h2")
        titleOfMovie.textContent = `Title: ${movieTitle}`;

        let dateReleased = document.createElement("h3")
        dateReleased.textContent = `Release Date: ${movieReleaseDate}`;

        let voteOfMovie = document.createElement("h4")
        voteOfMovie.textContent = `Movie Vote: ${movieVote}`;

        let popularityOfMovie = document.createElement("h4")
        popularityOfMovie.textContent = `Movie Popularity: ${moviePopularity}`

        let overviewOfMovie = document.createElement("p")
        overviewOfMovie.textContent = `Overview: ${movieOverview}`;


        moviePosterCont.append(movieImg);

        movieRatingsDescripCont.append(titleOfMovie, dateReleased, voteOfMovie, popularityOfMovie, overviewOfMovie);

        displayUI.append(moviePosterCont, movieRatingsDescripCont);
    })
}

window.onload = function(){
    const movieEntered = getRequestedMovie();
    if(movieEntered){
        fetchMovieResult(movieEntered)
    }
};

