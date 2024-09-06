/**
 * App context state type
 */
export type AppContextState = {
  routeId: number;
  searchScope?: string;
}

type AppReducerSetRoute = {
  type: 'SET_ROUTEID';
  payload: number;
}

type AppReducerSetPage = {
  type: 'SOME_ACTION_WITHOUT_PAYLOAD';
}

/**
 * App reducer action type
 */
export type AppReducerActions = AppReducerSetRoute | AppReducerSetPage;

/**
 * App context type
 */
export type AppContextType = {
  appState: AppContextState;
  appDispatch: React.Dispatch<AppReducerActions>;
}

/**
 * Route items type
 */
export type RouteItem = {
  routeId: number;
  path: string;
  href: string;
  menuItem: string;
  header: string;
  placement: 'HEADER' | 'SIDE_NAV' | 'NONE';
  loader: ({ params }: LoaderFunctionProps) => Promise<{} | null>;
  navBack: boolean;
}

/**
 * Route loader function props
 */
export type LoaderFunctionProps = {
  params: {
    page?: string;
    movieid?: string;
  };
  request: Request;
}

/**
 * Movie list response
 */
export type TmdbMovieList = {
  dates: {
    maximum: string;
    minumum: string;
  };
  page: number;
  results: TmdbMovieListData[];
  total_pages: string;
  total_results: string;
}

/**
 * Movie list results object
 */
export type TmdbMovieListData = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

/**
 * Movie details response object
 */
export type TmdbMovieDetailsData = {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: {
    id: number;
    name: string;
    poster_path: string;
    backdrop_path: string;
  };
  budget: number;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: [
    {
      id: number;
      logo_path: string;
      name: string;
      origin_country: string;
    },
  ];
  production_countries: [
    {
      iso_3166_1: string;
      name: string;
    }
  ];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: [
    {
      english_name: string;
      iso_639_1: string;
      name: string;
    }
  ];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/**
 * Movie cast object
 */
export type TmdbMovieCastData = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

/**
 * Movie crew object
 */
export type TmdbMovieCrewData = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  department: string;
  job: string;
}

/**
 * Movie credits response object
 */
export type TmdbMovieCreditsData = {
  id: number;
  cast: TmdbMovieCastData[];
  crew: TmdbMovieCrewData[];
}


/**
 * T details response object
 */
export type TMovieListData = {
  url: string;
  hash: string;
  quality: string;
  type: string;
  is_repack: number;
  video_codec: string;
  bit_depth: number;
  audio_channels: number;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}