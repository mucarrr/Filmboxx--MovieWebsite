const api_url =
  "https://api.themoviedb.org/3/movie/popular?api_key=0c8a5f601cf64baac4bf963d95b566d5&language=en-US&page=1";
const search_url =
  "https://api.themoviedb.org/3/search/movie?api_key=0c8a5f601cf64baac4bf963d95b566d5&include_adult=false&language=en-US&page=1&query=";
const img_url = "https://image.tmdb.org/t/p/w1280";

const form = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");

getMovies(api_url);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data.results);
  showMovies(data.results);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (search.value && search.value !== "") {
    getMovies(search_url + search.value);
  } else {
    window.location.reload();
  }
});
function showMovies(movies) {
  main.innerHTML = "";
  if (movies.length === 0) {
    main.innerHTML =
      "<h1 class='center' style='color: white;'>No movies found.</h1>";
    return;
  }
  movies.forEach((movie) => {
    const { title, poster_path, overview, vote_average } = movie;
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <img src="${img_url + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(
                  vote_average
                )}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
                <h3>${title} <small>overview</small></h3>
                <p>${overview}</p>
            </div>
        `;
    main.appendChild(movieEl);
  });
}
function getClassByRate(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}
