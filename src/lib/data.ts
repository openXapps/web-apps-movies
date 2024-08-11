import { RouteItem } from "./types";

/**
 * Route navigation data object
 */
export const routes: RouteItem[] = [
  { routeId: 0, path: ':page?', menuItem: 'Now Playing', href: '/', header: 'Movies Now Playing', navBack: false },
  { routeId: 1, path: 'popular/:page?', menuItem: 'Polular', href: '/popular', header: 'Popular Movies', navBack: false },
  { routeId: 2, path: 'toprated/:page?', menuItem: 'Top Rated', href: '/toprated', header: 'Top Rated Moves', navBack: false },
  { routeId: 3, path: 'upcoming/:page?', menuItem: 'Upcoming', href: '/upcoming', header: 'Upcoming Moves', navBack: false },
  { routeId: 4, path: 'ondvd/:page?', menuItem: 'On DVD', href: '/ondvd', header: 'Movies On DVD', navBack: false },
  { routeId: 5, path: 'similar/:id/:page?', menuItem: 'Similar', href: '/similar', header: 'Similar Movies', navBack: false },
  { routeId: 6, path: 'favourites', menuItem: 'Favourites', href: '/favourites', header: 'Favourite Movies', navBack: false },
  { routeId: 7, path: 'movie/:id', menuItem: 'Movie Biography', href: '/movie', header: 'Movie Biography', navBack: true },
]

