import { RouteItems } from "./types";

/**
 * Route navigation data object
 */
export const navigation: RouteItems = [
  { route: 'Now Playing', href: '/', header: 'Movies Now Playing', navBack: false },
  { route: 'Polular', href: '/popular', header: 'Popular Movies', navBack: false },
  { route: 'Top Rated', href: '/toprated', header: 'Top Rated Moves', navBack: false },
  { route: 'Upcoming', href: '/upcoming', header: 'Upcoming Moves', navBack: false },
  { route: 'On DVD', href: '/ondvd', header: 'Movies On DVD', navBack: false },
  { route: 'Favourites', href: '/favourites', header: 'Favourite Movies', navBack: false },
  { route: 'Movie Biography', href: '/movie', header: 'Movie Biography', navBack: true },
]

