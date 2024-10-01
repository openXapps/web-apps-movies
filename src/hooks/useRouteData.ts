import { TmdbMovieList } from "@/lib/types";
import { useMatches, useRouteLoaderData } from "react-router-dom";

export default function useRouteData(): TmdbMovieList {
  const rrMatches = useMatches();
  return useRouteLoaderData(rrMatches[rrMatches.length - 1].id) as TmdbMovieList;
}
