const API_KEY = "a4b90e935f34e30355099ac56904f4f3";
const API_LANGUAGE = "pt-br";
const LIST = ["tt3748528", "tt2488496", "tt2527338", "tt2527336", "tt3778644","tt0086190", "tt0080684", "tt0076759",  "tt0121766", "tt0121765", "tt0120915"];
const WATCH = ["https://www.disneyplus.com/pt-br/browse/entity-5ec74210-f970-42b7-a39f-8653c0a9eab8", "https://www.disneyplus.com/browse/entity-2854a94d-3702-40bd-97a4-12d55a809188", "https://www.disneyplus.com/browse/entity-43f9c275-e7e8-4ab3-802d-00d06a8ad841", "https://www.disneyplus.com/browse/entity-50c1aff5-3051-4839-9ebf-e332c635e216", "https://www.disneyplus.com/browse/entity-791bc772-d930-40c9-83ec-5ef85923573e", "https://www.disneyplus.com/pt-br/browse/entity-4b6e7cda-daa5-4f2d-9b61-35bbe562c69c", "https://www.disneyplus.com/pt-br/browse/entity-0f5c5223-f4f6-46ef-ba8a-69cb0e17d8d3", "https://www.disneyplus.com/pt-br/browse/entity-9a280e53-fcc0-4e17-a02c-b1f40913eb0b", "https://www.disneyplus.com/pt-br/browse/entity-eb1e2c5f-69bf-4240-a61f-7ffc4e0311b3", "https://www.disneyplus.com/pt-br/browse/entity-39cbdf17-1bbe-4de2-b4a4-8e342875c2c6", "https://www.disneyplus.com/pt-br/browse/entity-e0a9fee4-2959-4077-ad8c-8fab4fd6e4d1"];
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

const soundlogo = document.querySelector("#SoundEffectLogo");

function SoundPlayLogo() {
    const playpause = soundlogo.currentTime;
    const logochng = document.querySelector("#logo");

    if (playpause == 0) {
        soundlogo.play();
        soundlogo.currentTime = 0;
        logochng.classList.add("logorst");
    } else {
        soundlogo.pause();
        soundlogo.currentTime = 0;
        logochng.classList.remove("logorst");
    }
}

const soundtr = document.querySelector("#SoundEffect");
const soundtr2 = document.querySelector("#SoundEffectLeave");

function Play() {
    soundtr.currentTime = 0;
    soundtr.play(); 
} 

function Pause() {
    soundtr.pause();
    soundtr2.play();
}

const soundpl = document.querySelector("#SoundEffectPlay"); 
const soundpl2 = document.querySelector("#SoundEffectPlayLeave");

function Play2() {
    soundpl.currentTime = 0;
    soundpl.play(); 
}

function Pause2() {
    soundpl.pause();
    soundpl2.play();
}

const UrlLink1 = document.querySelector('.watch');
const UrlLink2 = document.querySelector('.trailer');
UrlLink1.setAttribute('onclick', `WatchUrlLink()`);
UrlLink2.setAttribute('onclick', `WatchUrlLink()`);

function WatchUrlLink() {
    const MoviesUrl = document.querySelector(".active");
    const ListMoviesUrl = MoviesUrl.id;
    
    switch (ListMoviesUrl) {
        case LIST[0]: window.location.href = WATCH[0];break;
        case LIST[1]: window.location.href = WATCH[1];break;
        case LIST[2]: window.location.href = WATCH[2];break;
        case LIST[3]: window.location.href = WATCH[3];break;
        case LIST[4]: window.location.href = WATCH[4];break;
        case LIST[5]: window.location.href = WATCH[5];break;
        case LIST[6]: window.location.href = WATCH[6];break;
        case LIST[7]: window.location.href = WATCH[7];break;
        case LIST[8]: window.location.href = WATCH[8];break;
        case LIST[9]: window.location.href = WATCH[9];break;
        case LIST[10]: window.location.href = WATCH[10];break;
        default: console.log("Erro! Endereço não encontrado!");
    }
}

const ChangeBttn = document.querySelector('.button_menu');
ChangeBttn.setAttribute('onclick', `changeButtonMenu()`)

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
        const PageTtl = document.querySelector("#PageTitle");

        const YearRelease = data.release_date.split("-")[0];
        
        const repl = data.title;
        const NewString = repl.replace("Guerra nas Estrelas", "Star Wars");
        title.innerHTML = NewString;

        PageTtl.innerHTML = NewString + " | Disney+";

        description.innerHTML = data.overview;
        rating.innerHTML = average;
        info.innerHTML = YearRelease + " - " + data.genres[1].name + " - Filme";
    
        const Image = BASE_URL_IMAGE.original.concat(data.backdrop_path);
        appImage.setAttribute("src", Image);

        const button = document.querySelector(".button_menu");
        button.classList.remove("act");

        const navigation = document.querySelector(".navigation");
        navigation.classList.remove("actv");

        changeMovieActive(MovieId);
        /*changeButtonMenu();*/
    });
}

function changeMovieActive(newMovieActive) {
    const movieActiveCurrent = document.getElementById(movieActive);
    const movieActiveCurrentMobile = document.getElementById(movieActive + " mbl");
    movieActiveCurrent.classList.remove("active");
    movieActiveCurrentMobile.classList.remove("active");

    const movieActiveNew = document.getElementById(newMovieActive);
    const movieActiveNewMobile = document.getElementById(newMovieActive + " mbl");
    movieActiveNew.classList.add("active");
    movieActiveNewMobile.classList.add("active")

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
        movieMobile.setAttribute('id', MovieId + " mbl");

        const repl = data.title;
        const NewString = repl.replace("Guerra nas Estrelas", "Star Wars");

        const genre = `<span>${data.genres[1].name}</span>`;
        const title = `<strong>${NewString}</strong>`;
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