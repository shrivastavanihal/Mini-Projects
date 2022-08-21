const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4871dfef45856e3f6ed1103feb1e272a&page=1";
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const SEARCH_URL =
  'https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=4871dfef45856e3f6ed1103feb1e272a&query="';

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

async function getMovies(url) {
  let response = await fetch(url);
  let data = await response.json();
  showMovies(data.results);
}

form.addEventListener("submit", e => {
  e.preventDefault();
  let searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_URL + searchTerm);
    search.value = "";
  } else {
    window.location.reload();
  }
});

function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach(movie => {
    const { title, vote_average, poster_path, overview } = movie;

    const moiveEl = document.createElement("div");

    moiveEl.classList.add("movie");
    moiveEl.innerHTML = `
        <img
          src="${IMG_URL + poster_path}"
          alt="${title}"
        />
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${getClassByVote(
              vote_average
            )}">${vote_average}</spanc>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${overview}
        </div>
    `;
    main.appendChild(moiveEl);
  });

  function getClassByVote(vote) {
    if (vote >= 8) {
      return "green";
    } else if (vote >= 5) {
      return "orange";
    } else {
      return "red";
    }
  }
}


let check = async url => {
  let response = await fetch(url);
  let data = await response.json();

  showMovies(data.results);
};

check(API_URL);
