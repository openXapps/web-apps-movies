import { RouteItems } from "./types";

/**
 * Route navigation data object
 */
export const navigation: RouteItems = [
  { id: '0-0', route: 'Trending', href: '/', title: 'Movies Now Trending', navBack: false },
  { id: '0-1', route: 'On DVD', href: '/ondvd', title: 'Movies On DVD', navBack: false },
  { id: '0-2', route: 'Favourites', href: '/favourites', title: 'Favourite Movies', navBack: false },
  { id: '0-3', route: 'Movie Biography', href: '/movie/', title: 'Movie Biography', navBack: true },
]

