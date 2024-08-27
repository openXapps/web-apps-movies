import { getMovie, getMovies } from "./api";
import { LoaderFunctionProps, RouteItem } from "./types";

export function loaderNowPlaying({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.NOW_PAYING, page: params.page, movieId: '' },);
}

export function loaderPopular({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.POPULAR, page: params.page, movieId: '' },);
}

export function loaderTopRated({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.TOP_RATED, page: params.page, movieId: '' },);
}

export function loaderUpcoming({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.UPCOMING, page: params.page, movieId: '' },);
}

export function loaderOnDvD({ params }: LoaderFunctionProps) {
  return getMovies({ routeId: RouteId.ON_DVD, page: params.page, movieId: '' },);
}

export function loaderSimilar({ params }: LoaderFunctionProps) {
  console.log(params);
  return getMovies({ routeId: RouteId.SIMILAR, page: params.page, movieId: params.movieid },);
}

export function loaderFavourites() {
  return getMovies({ routeId: RouteId.FAVOURITES, page: '', movieId: '' },);
}

export function loaderMovieBiography({ params }: LoaderFunctionProps) {
  return getMovie({ query: 'MOVIE', movieId: params.movieid });
}

/**
 * Route enums
 */
export enum RouteId {
  NOW_PAYING = 0,
  POPULAR = 1,
  TOP_RATED = 2,
  UPCOMING = 3,
  ON_DVD = 4,
  SIMILAR = 5,
  FAVOURITES = 6,
  MOVIE_BIOGRAPHY = 7,
}

/**
 * Route navigation data object
 */
export const routes: RouteItem[] = [
  {
    routeId: RouteId.NOW_PAYING,
    path: ':page?',
    href: '/',
    menuItem: 'Now Playing',
    header: 'Movies Now Playing',
    loader: loaderNowPlaying,
    navBack: false
  }, {
    routeId: RouteId.POPULAR,
    path: 'popular/:page?',
    href: '/popular',
    menuItem: 'Polular',
    header: 'Popular Movies',
    loader: loaderPopular,
    navBack: false
  }, {
    routeId: RouteId.TOP_RATED,
    path: 'toprated/:page?',
    menuItem: 'Top Rated',
    href: '/toprated',
    header: 'Top Rated Moves',
    loader: loaderTopRated,
    navBack: false
  }, {
    routeId: RouteId.UPCOMING,
    path: 'upcoming/:page?',
    href: '/upcoming',
    menuItem: 'Upcoming',
    header: 'Upcoming Moves',
    loader: loaderUpcoming,
    navBack: false
  },
  {
    routeId: RouteId.ON_DVD,
    path: 'ondvd/:page?',
    href: '/ondvd',
    menuItem: 'On DVD',
    header: 'Movies On DVD',
    loader: loaderOnDvD,
    navBack: false
  },
  {
    routeId: RouteId.SIMILAR,
    path: 'similar/:movieid/:page?',
    href: '/similar',
    menuItem: 'Similar',
    header: 'Similar Movies',
    loader: loaderSimilar,
    navBack: false
  },
  {
    routeId: RouteId.FAVOURITES,
    path: 'favourites',
    href: '/favourites',
    menuItem: 'Favourites',
    header: 'Favourite Movies',
    loader: loaderFavourites,
    navBack: false
  },
  {
    routeId: RouteId.MOVIE_BIOGRAPHY,
    path: 'movie/:movieid',
    href: '/movie',
    menuItem: 'Movie Biography',
    header: 'Movie Biography',
    loader: loaderMovieBiography,
    navBack: true
  },
]



