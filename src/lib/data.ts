import { RouteItems } from "./types";

/**
 * Route navigation data object
 */
export const navigation: RouteItems = {
  items: [
    { route: 'Now Showing', href: '/', title: 'Movies Now Showing' },
    { route: 'On DVD', href: '/ondvd', title: 'Movies On DVD' },
    { route: 'Favourites', href: '/favourites', title: 'Favourite Movies' },
  ]
}