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
 * @param {string} id URL by Id
 */
export type BuildMovieListUrlProps = {
  routeId: number;
  page: string | undefined;
  id: string | undefined;
}

/**
 * Helper function to build a Fetch ready URL for movie list
 * @param {BuildMovieListUrlProps} props Function props
 * @returns Fetch-ready URL
 */
export function buildMovieListUrl({ routeId, page, id }: BuildMovieListUrlProps): string {
  let url = import.meta.env.VITE_API_BASE_URL;
  const key = decryptCipher(import.meta.env.VITE_API_KEY);
  // const route = getRoute(routeId);

  switch (routeId) {
    case RouteId.NOW_PAYING:
      url += '/movie/now_playing';
      url += `?include_adult=false&language=en-US&region=US&`;
      break;
    case RouteId.POPULAR:
      url += '/movie/popular';
      url += `?include_adult=false&language=en-US&region=US&`;
      break;
    case RouteId.TOP_RATED:
      url += '/movie/top_rated';
      url += `?include_adult=false&language=en-US&region=US&`;
      break;
    case RouteId.UPCOMING:
      url += '/movie/upcoming';
      url += `?include_adult=false&language=en-US&region=US&`;
      break;
    case RouteId.ON_DVD:
      // 90 days back for 50 days duration
      const fromSeconds = (new Date().getTime() / 1000) - (60 * 60 * 24 * 90);
      const toSeconds = (60 * 60 * 24 * 50);
      url += '/discover/movie';
      url += '?include_adult=false&language=en-US&region=US&vote_count.gte=5&sort_by=popularity.desc';
      url += `&primary_release_date.gte=${moment.unix(fromSeconds - toSeconds).format('YYYY-MM-DD')}`;
      url += `&primary_release_date.lte=${moment.unix(fromSeconds).format('YYYY-MM-DD')}&`;
      break;
    case RouteId.SIMILAR:
      url += `/movie/${id}/similar`;
      url += '?include_adult=false&language=en-US&region=US&vote_count.gte=5&sort_by=popularity.desc&';
      break;
    // case '/favourites':
    //   url += '/movie/now_playing';
    //   url += `?language=en-US&region=US`;
    //   url += '&';
    //   break;
    case RouteId.FILTER_BY_YEAR:
      const searchYByYear = '2023';
      url += '/discover/movie';
      url += '?include_adult=false&language=en-US&region=US&vote_count.gte=5&sort_by=popularity.desc';
      url += `&primary_release_year=${searchYByYear}&`;
      break;
    case RouteId.FILTER_BY_KEYWORD:
      const searchByKeyword = 'shark';
      url += '/search/movie';
      url += '?include_adult=false&sort_by=popularity.desc';
      url += `&query=${searchByKeyword}&`;
      break;
    case RouteId.FILTER_BY_CAST:
      // value passed should be { id: cast_id, name: cast_name }
      const filterByCastId = '12345';
      url += '/discover/movie';
      url += '?include_adult=false&language=en-US&vote_count.gte=5';
      url += `&with_cast=${filterByCastId}&`;
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
 * @param {string} id URL by Id
 */
export type BuildMovieDetailsUrlProps = {
  query: 'MOVIE' | 'CREDITS' | undefined;
  id: string | undefined;
}

/**
 * Helper function to build a Fetch ready URL for movie details
 * @param {BuildMovieDetailsUrlProps} props Function props
 * @returns Fetch-ready URL
 */
export function buildMovieDetailsUrl({ query, id }: BuildMovieDetailsUrlProps): string {
  let url = import.meta.env.VITE_API_BASE_URL;
  const key = decryptCipher(import.meta.env.VITE_API_KEY);

  switch (query) {
    case 'MOVIE':
      url += `/movie/${id}`
      break;
    case 'CREDITS':
      url += `/movie/${id}/credits`;
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