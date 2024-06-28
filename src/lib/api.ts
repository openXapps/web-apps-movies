/**
 * Fetching movies from TMDb
 * @returns Array of movies
 */
export async function getMovies(query: string) {
  // console.log(query);
  let respose: any;

  switch (query) {
    case 'trending':
      respose = await fetch('http://localhost:3004/results');
      break;
    case 'ondvd':
      respose = await fetch('http://localhost:3004/results');
      break;
    case 'favourites':
      respose = await fetch('http://localhost:3004/results');
      break;
    default:
      respose = await fetch('http://localhost:3004/results');
      break;
  }

  if (!respose.ok) {
    throw { message: 'Cannot fetch movies', status: 500 };
  }

  return respose.json();
}

