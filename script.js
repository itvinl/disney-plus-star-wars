const API_KEY = "a4b90e935f34e30355099ac56904f4f3";
const API_LANGUAGE = "pt-br";
const LIST = ["tt2488496", "tt2527338", "tt2527336", "tt3748528", "tt3778644","tt0086190", "tt0080684", "tt0076759",  "tt0121766", "tt0121765", "tt0120915"];
const BASE_URL_IMAGE = { 
    original: "https://image.tmdb.org/t/p/original",
    small: "https://image.tmdb.org/t/p/w500"
}
const MoviesList = document.getElementById("Movies_List");
const MoviesListMobile = document.getElementById("Movies_List_Mobile");
let movieActive = LIST[0];

function GetUrlMovie(MovieId) {
    return `https://api.themoviedb.org/3/movie/${MovieId}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
}

function changeButtonMenu() {
    const button = document.querySelector(".button_menu");
    const movmenu = document.querySelector(".movies");
    const movlist = document.querySelector("#Movies_List");
    const navigation = document.querySelector(".navigation");

    button.classList.toggle("act");
    movmenu.classList.toggle("menu");
    movlist.classList.toggle("list");
    navigation.classList.toggle("actv");
}

function setMainMovie(MovieId) {
    fetch(GetUrlMovie(MovieId)).then(response => response.json()).then(data => {
        const vote = data.vote_average;
        const average = vote.toFixed(1);
        
        const appImage = document.querySelector(".app_image img");
        const title = document.querySelector(".feature_movie h1");
        const description = document.querySelector(".feature_movie p");
        const info = document.querySelector(".feature_movie span");
        const rating = document.querySelector(".rating strong");
    
        const YearRelease = data.release_date.split("-")[0];
    
        title.innerHTML = data.title;
        description.innerHTML = data.overview;
        rating.innerHTML = average;
        info.innerHTML = YearRelease + " - " + data.genres[1].name + " - Filme";
    
        const Image = BASE_URL_IMAGE.original.concat(data.backdrop_path);
        appImage.setAttribute("src", Image);

        changeMovieActive(MovieId);
        changeButtonMenu();
    });
}

function changeMovieActive(newMovieActive) {
    const movieActiveCurrent = document.getElementById(movieActive);
    movieActiveCurrent.classList.remove("active");

    const movieActiveNew = document.getElementById(newMovieActive);
    movieActiveNew.classList.add("active");

    movieActive = newMovieActive;
}

function createButtonMovie(MovieId) {
    const button = document.createElement("button");
    button.setAttribute("onclick", `setMainMovie('${MovieId}')`);
    button.innerHTML = '<img src="./assets/icon-play-button.png" alt="Ícone do Botão de Play" width="30px"/>';
    return button;
}

function createImageMovie(movieImage, movieTitle) {
    const divImageMovie = document.createElement("div");
    divImageMovie.classList.add("movie_image");
    const image = document.createElement("img");

    image.setAttribute("src", movieImage);
    image.setAttribute("alt", `Imagem do Filme ${movieTitle}`);
    /* image.setAttribute("loading", "lazy"); */
    divImageMovie.appendChild(image);

    return divImageMovie;
}

function CreateMovie(MovieId) {
    fetch(GetUrlMovie(MovieId)).then(response => response.json()).then(data => {
        const movie = document.createElement("li");
        const movieMobile = document.createElement("li");
        movie.classList.add("movie");
        movieMobile.classList.add("movie");

        movie.setAttribute('id', MovieId);
        movieMobile.setAttribute('id', MovieId);

        const genre = `<span>${data.genres[1].name}</span>`;
        const title = `<strong>${data.title}</strong>`;
        const Image = BASE_URL_IMAGE.small.concat(data.backdrop_path);

        movie.innerHTML = genre + title;
        movieMobile.innerHTML = genre + title;
        movie.appendChild(createButtonMovie(MovieId));
        movieMobile.appendChild(createButtonMovie(MovieId));
        movie.appendChild(createImageMovie(Image, data.title));
        movieMobile.appendChild(createImageMovie(Image, data.title));
        MoviesList.appendChild(movie);
        MoviesListMobile.appendChild(movieMobile);
    }
)}

function LoadListMovies() {
    LIST.map(CreateMovie);
}

LoadListMovies();

setMainMovie(LIST[0])
