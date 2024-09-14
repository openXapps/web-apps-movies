import moment from 'moment';
// https://www.npmjs.com/package/crypto-js
import CryptoJs from 'crypto-js';

import { RouteItem } from '@/lib/types';
import { RouteId } from '@/lib/enums';
import { routes } from '@/lib/routes';

/**
 * Helper type to define props for Movie List URL Builder
 * @param {string} query URL query path
 * @param {string} page URL query page
 * @param {string} filter URL by Id
 */
export type BuildMovieListUrlProps = {
  routeId: number;
  page: string | undefined;
  filter: string | undefined;
}

/**
 * Helper function to build a Fetch ready URL for movie list
 * @param {BuildMovieListUrlProps} props Function props
 * @returns Fetch-ready URL
 */
export function buildMovieListUrl({ routeId, page, filter }: BuildMovieListUrlProps): string {
  let url = import.meta.env.VITE_API_BASE_URL;
  const key = decryptCipher(import.meta.env.VITE_API_KEY);
  // const route = getRoute(routeId);

  // Look at the API docs to see what discover can do
  // https://developer.themoviedb.org/reference/discover-movie

  switch (routeId) {
    case RouteId.NOW_PAYING:
      url += '/movie/now_playing?';
      break;
    case RouteId.POPULAR:
      url += '/movie/popular?';
      break;
    case RouteId.TOP_RATED:
      url += '/movie/top_rated?';
      break;
    case RouteId.UPCOMING:
      url += '/movie/upcoming?';
      break;
    case RouteId.ON_DVD:
      // 90 days back for 50 days duration
      const fromSeconds = (new Date().getTime() / 1000) - (60 * 60 * 24 * 90);
      const toSeconds = (60 * 60 * 24 * 50);
      url += '/discover/movie';
      url += '?vote_count.gte=5&sort_by=popularity.desc';
      url += `&primary_release_date.gte=${moment.unix(fromSeconds - toSeconds).format('YYYY-MM-DD')}`;
      url += `&primary_release_date.lte=${moment.unix(fromSeconds).format('YYYY-MM-DD')}&`;
      break;
    case RouteId.SIMILAR:
      url += `/movie/${filter}/recommendations?`;
      break;
    // case '/favourites':
    //   url += '/movie/now_playing';
    //   url += `?language=en-US`;
    //   url += '&';
    //   break;
    case RouteId.FILTER_BY_YEAR:
      url += '/discover/movie';
      url += '?vote_count.gte=5&sort_by=popularity.desc';
      url += `&primary_release_year=${filter}&`;
      break;
    case RouteId.FILTER_BY_KEYWORD:
      url += `/search/movie?query=${filter}&`;
      break;
    case RouteId.FILTER_BY_CAST:
      url += '/discover/movie';
      url += '?vote_count.gte=5&sort_by=popularity.desc';
      url += `&with_cast=${filter}&`;
      break;
    default:
      break;
  }
  url += `api_key=${key}`;
  url += `&page=${page || '1'}`;

  return url;
}

/**
 * Helper type to define props for Movie Details URL Builder
 * @param {string} query URL query option
 * @param {string} filter URL by Id
 */
export type BuildMovieDetailsUrlProps = {
  query: 'MOVIE' | 'CREDITS' | undefined;
  filter: string | undefined;
}

/**
 * Helper function to build a Fetch ready URL for movie details
 * @param {BuildMovieDetailsUrlProps} props Function props
 * @returns Fetch-ready URL
 */
export function buildMovieDetailsUrl({ query, filter }: BuildMovieDetailsUrlProps): string {
  let url = import.meta.env.VITE_API_BASE_URL;
  const key = decryptCipher(import.meta.env.VITE_API_KEY);

  switch (query) {
    case 'MOVIE':
      url += `/movie/${filter}`
      break;
    case 'CREDITS':
      url += `/movie/${filter}/credits`;
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