import moment from 'moment';

// https://medium.com/@bobjunior542/master-the-react-router-6-useloaderdata-hook-a-comprehensive-guide-38eca47eaf25

/**
 * Fetching movies from TMDb
 * @returns Array of movies
 */
export async function getMovies(query: string, page: string) {
  // console.log(query);
  let response: any;
  let url = import.meta.env.VITE_API_BASE_URL;

  // console.log('API page# ', page);

  switch (query) {
    case '/':
      url += '/movie/now_playing'
      url += `?language=en-US&region=US`
      break;
    case '/ondvd':
      // 90 days back for 50 days duration
      const fromSeconds = (new Date().getTime() / 1000) - (60 * 60 * 24 * 90);
      const toSeconds = (60 * 60 * 24 * 50);
      url += '/discover/movie';
      url += '?include_adult=false&language=en-US&region=US&vote_count.gte=5&sort_by=popularity.desc';
      url += `&primary_release_date.gte=${moment.unix(fromSeconds - toSeconds).format('YYYY-MM-DD')}`;
      url += `&primary_release_date.lte=${moment.unix(fromSeconds).format('YYYY-MM-DD')}`;
      break;
    case '/favourites':
      url += '/movie/now_playing'
      url += `?language=en-US&region=US`
      break;
    default:
      break;
  }
  url += `&api_key=${import.meta.env.VITE_API_KEY}`;
  url += `&page=${page}`;

  response = await fetch(url);

  if (!response.ok) {
    throw { message: 'Cannot fetch movies', status: 500 };
  }

  // useLoaderData will call .json() on the response
  return response;
}

