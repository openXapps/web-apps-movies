import moment from 'moment';
// https://www.npmjs.com/package/crypto-js
import CryptoJs from 'crypto-js';
import { RouteItem } from './types';
import { routes } from './routes';

/**
 * Helper type to define props for Movie List URL Builder
 * @param {string} query URL query path
 * @param {string} page URL query page
 * @param {string} id URL movie Id
 */
export type BuildMovieListUrlProps = {
  routeId: number;
  page: string | undefined;
  movieId: string | undefined;
}

/**
 * Helper function to build a Fetch ready URL for movie list
 * @param {BuildMovieListUrlProps} props Function props
 * @returns Fetch-ready URL
 */
export function buildMovieListUrl({ routeId, page, movieId }: BuildMovieListUrlProps): string {
  let url = import.meta.env.VITE_API_BASE_URL;
  const key = decryptCipher(import.meta.env.VITE_API_KEY);
  const route = getRoute(routeId);

  switch (route.href) {
    case '/':
      url += '/movie/now_playing';
      url += `?language=en-US&region=US`;
      url += '&';
      break;
    case '/popular':
      url += '/movie/popular';
      url += `?language=en-US&region=US`;
      url += '&';
      break;
    case '/toprated':
      url += '/movie/top_rated';
      url += `?language=en-US&region=US`;
      url += '&';
      break;
    case '/upcoming':
      url += '/movie/upcoming';
      url += `?language=en-US&region=US`;
      url += '&';
      break;
    case '/ondvd':
      // 90 days back for 50 days duration
      const fromSeconds = (new Date().getTime() / 1000) - (60 * 60 * 24 * 90);
      const toSeconds = (60 * 60 * 24 * 50);
      url += '/discover/movie';
      url += '?include_adult=false&language=en-US&region=US&vote_count.gte=5&sort_by=popularity.desc';
      url += `&primary_release_date.gte=${moment.unix(fromSeconds - toSeconds).format('YYYY-MM-DD')}`;
      url += `&primary_release_date.lte=${moment.unix(fromSeconds).format('YYYY-MM-DD')}`;
      url += '&';
      break;
    case '/similar':
      url += `/movie/${movieId}/similar`;
      url += '?';
      break;
    // case '/favourites':
    //   url += '/movie/now_playing';
    //   url += `?language=en-US&region=US`;
    //   url += '&';
    //   break;
    default:
      break;
  }
  url += `api_key=${key}`;
  url += `&page=${page || '1'}`;

  return url;
}

export type BuildMovieDetailsUrlProps = {
  query: 'MOVIE' | 'CREDITS' | undefined;
  movieId: string | undefined;
}

/**
 * Helper function to build a Fetch ready URL for movie details
 * @param {BuildMovieDetailsUrlProps} props Function props
 * @returns Fetch-ready URL
 */
export function buildMovieDetailsUrl({ query, movieId }: BuildMovieDetailsUrlProps): string {
  let url = import.meta.env.VITE_API_BASE_URL;
  const key = decryptCipher(import.meta.env.VITE_API_KEY);

  switch (query) {
    case 'MOVIE':
      url += `/movie/${movieId}`
      break;
    case 'CREDITS':
      url += `/movie/${movieId}/credits`;
      break;
    default:
      break;
  }
  url += `?api_key=${key}`;

  return url;
}

/**
 * Helper function to decrypt cipher with CryptoJS
 * @param {string} cipher Encrypted cipher to descrypt
 * @returns Decrypted string value
 */
export const decryptCipher = (cipher: string): string => {
  const secret: string = import.meta.env.VITE_CIPHER_KEY;
  let response: string = '';
  try {
    const bytes: CryptoJs.lib.WordArray = CryptoJs.AES.decrypt(cipher, secret);
    response = bytes.toString(CryptoJs.enc.Utf8);
    if (response.length === 0) {
      throw new Error('Invalid secret');
    }
  } catch (error) {
    throw new Error('Could not decrypt cipher');;
  }
  return response;
};

// https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API
/**
 * Helper function to copy a string to memory
 * @param {string} text String to copy into memory
 * @returns Boolean of success or failed
 */
export const copyToClipboard = async (text: string) => {
  let response = false;
  // Doesn't work on IP URL, only localhost and HTTPS
  // stackoverflow.com/questions/51805395/navigator-clipboard-is-undefined
  await navigator.clipboard.writeText(text)
    .then(() => { response = true })
    .catch(() => (response = false));
  return response;
};

/**
 * Helper function to fetch a route object by ID
 * @param routeId Route ID to fetch
 * @returns Returns a route object
 */
export function getRoute(routeId: number): RouteItem {
  let newRoute: RouteItem = routes[0];
  const newRouteArr = routes.filter(v => v.routeId === routeId);
  if (newRouteArr.length === 1) newRoute = newRouteArr[0];
  return newRoute;
}