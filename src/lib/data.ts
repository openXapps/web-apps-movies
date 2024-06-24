import { RouteItems, Movies } from "./types";

/**
 * Route navigation data object
 */
export const navigation: RouteItems = [
  { id: '0-0', route: 'Trending', href: '/', title: 'Movies Now Trending', navBack: false },
  { id: '0-1', route: 'On DVD', href: '/ondvd', title: 'Movies On DVD', navBack: false  },
  { id: '0-2', route: 'Favourites', href: '/favourites', title: 'Favourite Movies', navBack: false  },
  { id: '0-3', route: 'Movie Biography', href: '/movie/', title: 'Movie Biography', navBack: true  },
]

/**
 * Movies data mock
 */
export const movies: Movies = [
  { key: 1, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name', favourite: false },
  { key: 2, id: '1E5baAaEse26fej7uHcjOgEE2t3', title: 'Movie Name That Is Very Very Very Long', favourite: true },
  { key: 3, id: '1E5baAaEse26fej7uHcjOgEE2t4', title: 'Short', favourite: false },
  { key: 4, id: '1E5baAaEse26fej7uHcjOgEE2t5', title: 'Movie Name', favourite: true },
  { key: 5, id: '1E5baAaEse26fej7uHcjOgEE2t6', title: 'Movie Name Medium', favourite: false },
  { key: 6, id: '1E5baAaEse26fej7uHcjOgEE2t7', title: 'Movie Name', favourite: false },
  { key: 7, id: '1E5baAaEse26fej7uHcjOgEE2t8', title: 'Movie Name', favourite: true },
]