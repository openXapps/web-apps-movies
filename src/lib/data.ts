import { RouteItems } from "./types";

/**
 * Route navigation data object
 */
export const navigation: RouteItems = [
  { route: 'Trending', href: '/trending', title: 'Movies Now Trending', navBack: false },
  { route: 'On DVD', href: '/ondvd', title: 'Movies On DVD', navBack: false },
  { route: 'Favourites', href: '/favourites', title: 'Favourite Movies', navBack: false },
  { route: 'Movie Biography', href: '/movie', title: 'Movie Biography', navBack: true },
]

