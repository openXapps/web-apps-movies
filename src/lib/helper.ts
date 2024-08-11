import moment from 'moment';
// https://www.npmjs.com/package/crypto-js
import CryptoJs from 'crypto-js';
import { RouteItem } from './types';

/**
 * Helper type to define props for Movie List URL Builder
 * @param {string} query URL query path
 * @param {string} page URL query page
 * @param {string} id URL movie Id
 */
export type BuildMovieListURLProps = {
  route: RouteItem;
  page: string | undefined;
  id: string | undefined;
}

/**
 * Helper function to build a Fetch ready URL for movie list
 * @param {BuildMovieListURLProps} props Function props
 * @returns Fetch-ready URL
 */
export function buildMovieListUrl({ route, page, id }: BuildMovieListURLProps): string {
  let url = import.meta.env.VITE_API_BASE_URL;
  const key = decryptCipher(import.meta.env.VITE_API_KEY);

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
      url += `/movie/${id}/similar`;
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

export type MovieQueryProps = 'MOVIE' | 'CREDITS' | undefined;

/**
 * Helper function to build a Fetch ready URL for movie details
 * @param {MovieQueryProps} query User selection from UI
 * @param {string} id TMDb unique move Id
 * @returns Fetch-ready URL
 */
export function buildMovieDetailsUrl(query: MovieQueryProps, id: string | undefined): string {
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