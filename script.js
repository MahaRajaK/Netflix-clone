

window.onload = () => {
  getOriginals()
  getTrendingNow()
  getTopRated()
}


function fetchMovies(url, dom_element, path_type) {
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('something went wrong')
      }
    })
    .then(data => {
      showMovies(data, dom_element, path_type)
    })
    .catch(error_data => {
      console.log(error_data)
    })
}

showMovies = (movies, dom_element, path_type) => {
  
  var moviesEl = document.querySelector(dom_element)

  for (var movie of movies.results) {

    var imageElement = document.createElement('img')

    imageElement.setAttribute('data-id', movie.id)

    imageElement.src = `https://image.tmdb.org/t/p/original${movie[path_type]}`

    imageElement.addEventListener('click', e => {
      handleMovieSelection(e)
    })
    moviesEl.appendChild(imageElement)
  }
}

function getOriginals() {
  var url =
    'https://api.themoviedb.org/3/discover/tv?api_key=19f84e11932abbc79e6d83f82d6d1045&with_networks=213'
  fetchMovies(url, '.original__movies', 'poster_path')
}
function getTrendingNow() {
  var url =
    'https://api.themoviedb.org/3/trending/movie/week?api_key=19f84e11932abbc79e6d83f82d6d1045'
  fetchMovies(url, '#trending', 'backdrop_path')
}
function getTopRated() {
  var url =
    'https://api.themoviedb.org/3/movie/top_rated?api_key=19f84e11932abbc79e6d83f82d6d1045&language=en-US&page=1'
  fetchMovies(url, '#top_rated', 'backdrop_path')
}






