import { basicFetch } from '../../api/fetchFunctions';
import { POPULAR_BASE_URL, SEARCH_BASE_URL } from '../../config';
// Types
import type { Movies, Movie } from '../../api/types';

const initializeScript = () => {
  const TIME = 300; //ms

  let page = 1;
  let movies: Array<Movie> = [];
  let timer = 0;

  let searchInputValue: string | undefined = '';

  const main = document.querySelector('main');
  const input = document.querySelector('input');
  const div = document.querySelector('.movie-grid');
  const hero = document.getElementById('hero');
  const spinner = document.getElementById('spinner');
  const gridHeader = document.getElementById('grid-header');

  const fetchMovies = async () => {
    // Show loading spinner
    if (spinner) spinner.style.visibility = 'visible';

    const endpoint = searchInputValue
      ? `${SEARCH_BASE_URL}${searchInputValue}&page=${page}`
      : `${POPULAR_BASE_URL}&page=${page}`;

    const movieData = await basicFetch<Movies>(endpoint);
    page++;

    // Hide loading spinner
    if (spinner) spinner.style.visibility = 'hidden';

    if (movieData) movies = [...movies, ...movieData.results];

    // Hide Hero on search
    if (hero) hero.style.display = !searchInputValue ? 'block' : 'none';
    // Change H2
    if (gridHeader)
      gridHeader.innerHTML = !searchInputValue ? 'Popular Movies' : `Searched movies (${movieData.total_results})`;

    div!.innerHTML = movies
      .map(
        movie =>
          `<a href="${movie.id}"><movie-card imgUrl=${movie.poster_path} title="${movie.original_title}"></movie-card></a>`
      )
      .join('');
  };

  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;

    // TODO: FIX THIS TO BE BETTER!
    if (scrollHeight - scrollTop - 50 <= clientHeight) fetchMovies();
  };

  const handleInput = () => {
    searchInputValue = input?.value;
    page = 1;
    movies = [];

    clearTimeout(timer);

    timer = setTimeout(() => {
      fetchMovies();
    }, TIME);
  };

  main?.addEventListener('scroll', handleScroll);
  input?.addEventListener('input', handleInput);
};

// Start script initially
initializeScript();

document.addEventListener('astro:after-swap', initializeScript);
