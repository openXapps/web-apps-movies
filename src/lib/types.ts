/**
 * Router items type
 */
export type RouteItems = {
  // id: string;
  href: string;
  route: string;
  title: string;
  navBack: boolean;
}[]

/**
 * Movie list response
 */
export type TmdbMovieList = {
  dates: {
    maximum: string;
    minumum: string;
  };
  page: number;
  results: TmdbMovieListResults;
  total_pages: string;
  total_results: string;
}

/**
 * Movie list results object
 */
export type TmdbMovieListResults = {
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
}[]

/**
 * Movie data type
 */
type TmdbMovieData = {
  "adult": false,
  "backdrop_path": "/ww1eIoywghjoMzRLRIcbJLuKnJH.jpg",
  "belongs_to_collection": {
    "id": 403374,
    "name": "Jack Reacher Collection",
    "poster_path": "/qtafXiYDUMKxzsssU41qWey5oiT.jpg",
    "backdrop_path": "/vViRXFnSyGJ2fzMbcc5sqTKswcd.jpg"
  },
  "budget": 60000000,
  "genres": [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 53,
      "name": "Thriller"
    }
  ],
  "homepage": "",
  "id": 343611,
  "imdb_id": "tt3393786",
  "origin_country": [
    "US"
  ],
  "original_language": "en",
  "original_title": "Jack Reacher: Never Go Back",
  "overview": "When Major Susan Turner is arrested for treason, ex-investigator Jack Reacher undertakes the challenging task to prove her innocence and ends up exposing a shocking conspiracy.",
  "popularity": 59.934,
  "poster_path": "/cOg3UT2NYWHZxp41vpxAnVCOC4M.jpg",
  "production_companies": [
    {
      "id": 82819,
      "logo_path": "/gXfFl9pRPaoaq14jybEn1pHeldr.png",
      "name": "Skydance Media",
      "origin_country": "US"
    },
    {
      "id": 83645,
      "logo_path": null,
      "name": "Huahua Media",
      "origin_country": "CN"
    },
    {
      "id": 3407,
      "logo_path": "/iVMjKOFyRvm9PW45lW1wW6TSvnj.png",
      "name": "Shanghai Film Group",
      "origin_country": "CN"
    },
    {
      "id": 21777,
      "logo_path": null,
      "name": "TC Productions",
      "origin_country": "US"
    },
    {
      "id": 4,
      "logo_path": "/gz66EfNoYPqHTYI4q9UEN4CbHRc.png",
      "name": "Paramount Pictures",
      "origin_country": "US"
    }
  ],
  "production_countries": [
    {
      "iso_3166_1": "CN",
      "name": "China"
    },
    {
      "iso_3166_1": "US",
      "name": "United States of America"
    }
  ],
  "release_date": "2016-10-19",
  "revenue": 162100000,
  "runtime": 118,
  "spoken_languages": [
    {
      "english_name": "English",
      "iso_639_1": "en",
      "name": "English"
    }
  ],
  "status": "Released",
  "tagline": "Justice is Coming.",
  "title": "Jack Reacher: Never Go Back",
  "video": false,
  "vote_average": 6,
  "vote_count": 4734
}