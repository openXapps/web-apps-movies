import { getMovie, getMovies } from "@/lib/api";
import { RouteId } from "@/lib/enums";
import type { LoaderFunctionProps, RouteItem } from "@/lib/types";

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
  return getMovies({ routeId: RouteId.SIMILAR, page: params.page, movieId: params.movieid },);
}

export function loaderMovieBiography({ params }: LoaderFunctionProps) {
  return getMovie({ query: 'MOVIE', movieId: params.movieid });
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
    placement: 'HEADER',
    loader: loaderNowPlaying,
    navBack: false
  }, {
    routeId: RouteId.POPULAR,
    path: 'popular/:page?',
    href: '/popular',
    menuItem: 'Popular',
    header: 'Popular Movies',
    placement: 'SIDE_NAV',
    loader: loaderPopular,
    navBack: false
  }, {
    routeId: RouteId.TOP_RATED,
    path: 'toprated/:page?',
    href: '/toprated',
    menuItem: 'Top Rated',
    placement: 'HEADER',
    header: 'Top Rated Moves',
    loader: loaderTopRated,
    navBack: false
  }, {
    routeId: RouteId.UPCOMING,
    path: 'upcoming/:page?',
    href: '/upcoming',
    menuItem: 'Upcoming',
    header: 'Upcoming Moves',
    placement: 'SIDE_NAV',
    loader: loaderUpcoming,
    navBack: false
  },
  {
    routeId: RouteId.ON_DVD,
    path: 'ondvd/:page?',
    href: '/ondvd',
    menuItem: 'On DVD',
    header: 'Movies On DVD',
    placement: 'HEADER',
    loader: loaderOnDvD,
    navBack: false
  },
  {
    routeId: RouteId.SIMILAR,
    path: 'similar/:movieid/:page?',
    href: '/similar',
    menuItem: 'Similar',
    header: 'Similar Movies',
    placement: 'NONE',
    loader: loaderSimilar,
    navBack: false
  },
  {
    routeId: RouteId.MOVIE_BIOGRAPHY,
    path: 'movie/:movieid',
    href: '/movie',
    menuItem: 'Movie Biography',
    header: 'Movie Biography',
    placement: 'NONE',
    loader: loaderMovieBiography,
    navBack: true
  },
]



