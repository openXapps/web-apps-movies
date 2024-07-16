import moment from 'moment';
// https://www.npmjs.com/package/crypto-js
import CryptoJs from 'crypto-js';

/**
 * Helper function to build a Fetch ready URL for movie list
 * @param {string} query User selection from UI
 * @param {string} page Page to query next
 * @returns Fetch-ready URL
 */
export function buildMovieListUrl(query: string, page: string | undefined): string {
  let url = import.meta.env.VITE_API_BASE_URL;

  switch (query) {
    case '/':
      url += '/movie/now_playing'
      url += `?language=en-US&region=US`
      break;
    case '/popular':
      url += '/movie/popular'
      url += `?language=en-US&region=US`
      break;
    case '/toprated':
      url += '/movie/top_rated'
      url += `?language=en-US&region=US`
      break;
    case '/upcoming':
      url += '/movie/upcoming'
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
  url += `&page=${page || '1'}`;

  return url;
}

/**
 * Helper function to build a Fetch ready URL for movie details
 * @param {string} query User selection from UI
 * @param {string} id TMDb unique move Id
 * @returns Fetch-ready URL
 */
export function buildMovieDetailsUrl(query: string, id: string | undefined): string {
  let url = import.meta.env.VITE_API_BASE_URL;

  switch (query) {
    case 'MOVIE':
      url += `/movie/${id}`
      break;
    case 'CAST':
      url += '/movie/path_to_cast_details';
      break;
    case 'DIRECTOR':
      url += '/movie/path_to_director_details'
      break;
    default:
      break;
  }
  url += `?api_key=${import.meta.env.VITE_API_KEY}`;

  return url;
}

/**
 * Helper function to decrypt cipher with CryptoJS
 * @param {string} cipher Encrypted cipher to descrypt
 * @returns Decrypted string value
 */
export const decryptCipher = (cipher: string): string => {
  const secret: string = import.meta.env.VITE_T_SECRET;
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