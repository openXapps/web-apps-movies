import { RouteItems, Movies } from "./types";

/**
 * Route navigation data object
 */
export const navigation: RouteItems = [
  { route: 'Now Showing', href: '/', title: 'Movies Now Showing' },
  { route: 'On DVD', href: '/ondvd', title: 'Movies On DVD' },
  { route: 'Favourites', href: '/favourites', title: 'Favourite Movies' },
  { route: 'Movie Biography', href: '/movie/', title: 'Movie Biography' },
]

/**
 * Movies data mock
 */
export const movies: Movies = [
  { key: 1, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name', favourite: false },
  { key: 2, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name That Is Very Very Very Long', favourite: true },
  { key: 3, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Short', favourite: false },
  { key: 4, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name', favourite: true },
  { key: 5, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name Medium', favourite: false },
  { key: 6, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name', favourite: false },
  { key: 7, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name', favourite: true },
]