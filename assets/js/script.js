var searchEL = document.querySelector('#search')
var parentGif = document.querySelector('#parentGif')
var searchBtnEL = document.querySelector('#searchBtn')
var poster = document.querySelector('#poster')
var movieTitle = document.querySelector('#movieTitle')
var duration = document.querySelector('#duration')
var movieInfo = document.querySelector('#movieInfo')
var reviewsEL = document.querySelector('#reviews')
var moreInfo = document.querySelector('#moreInfoParent')
var omdbKey = 'trilogy'
var giphKey = 'nw35KvBZSmb4OKNw51Qur35t2fh1nqob'
var imdbKey = 'k_brnh9rmg'


var imdbURL = `https://imdb-api.com/en/API/Top250Movies/${imdbKey}`

function handleSearch() {
  searchMovie();
}

function searchMovie() {
  /*  imdbCall(); */
  giphyCall();
  omdbCall();
}

function giphyCall() {
  var giphURL = `https://api.giphy.com/v1/gifs/search?api_key=${giphKey}&q=${searchEL.value}&limit=25&offset=0&rating=g&lang=en`
  fetch(giphURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var html = ''
      for (var i = 0; i < 4; i++) {
        var random = parseInt(Math.random() * data.data.length);
        gifResult = data.data[random].images.fixed_height.url;
        html += makeGif(gifResult)
      }
      parentGif.innerHTML = html
      i++
    })
};

function omdbCall() {
  var omdbURL = `https://www.omdbapi.com/?apikey=${omdbKey}&t=${searchEL.value}`
  fetch(omdbURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var html = ''
      movieTitle.textContent = `${data.Title} ${data.Runtime}`
      poster.setAttribute('src', data.Poster)
      reviews = gatherReviews(data);
      reviewsEL.innerHTML = makeReviews(reviews)
      /* moreInfo.innerHTML = makeMoreInfo(data.Director, data.Actors, data.Genre, data.Rated, data.Released, reviews) */
      movieInfo.innerHTML = makeMovieInfo(data.Director, data.Actors, data.Genre, data.Rated, data.Released, data.Awards, data.Plot)
    })
};

/* function imdbCall() {
  fetch(imdbURL).then((response) => {
    return response.json();
  })
    .then((data) => {
      var random = parseInt(Math.random() * data.items.length)
      console.log(data.items[random])
      var randomTitle = data.items[random].fullTitle
      movName = randomTitle
      console.log(movName)
    })
}; */


function makeGif(data) {
  return `<img id="insGif" src="${data}">`
}

function makeReviews(data) {
  html = ''
  for (var i = 0; i < data.length; i++) {
    html += `<h5 id='moreInfo'>${data[i].Rating} ${data[i].Source}</h5>`
  }
  return html
}

function gatherReviews(data) {
  reviewData = [
    {
      Source: '',
      Score: ''
    }
  ]
  for (var i = 0; i < data.Ratings.length; i++) {
    reviewData[i] = { Source: data.Ratings[i].Source, Rating: data.Ratings[i].Value };
  }
  return reviewData
}

/* function makeMoreInfo(director, actors, genre, rated, released, reviews) {
  return `<h5>Directed by: ${director}</h5>
  <h5>Actors: ${actors}</h5>
  <h5>Genre :${genre}</h5>
  <h5>Rated: ${rated}</h5>
  <h5>Year Released: ${released}</h5>
  <h5>Rated: ${reviews}</h5>
  <h5 id='moreInfo'>${plot}</h5>`
} */

function makeMovieInfo(director, actors, genre, rated, released, awards, plot) {
  return `<h5>Directed by: ${director}</h5>
  <h5>Actors: ${actors}</h5>
  <h5>Genre :${genre}</h5>
  <h5>Rated: ${rated}</h5>
  <h5>Released: ${released}</h5>
  <h5 id='moreInfo'>${awards}</h5>
  <h5 id='moreInfo'>${plot}</h5>`
};


document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});



searchBtnEL.addEventListener('click', input => {
  movName = searchEL.value
  handleSearch()

  console.log(movName)
});
