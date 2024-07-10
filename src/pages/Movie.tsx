import { getMovie } from "@/lib/api";
import { LoaderFunctionProps, TmdbMovieDetailsData } from "@/lib/types";
import { useLoaderData } from "react-router-dom";

export default function Movie() {
  const movie = useLoaderData() as TmdbMovieDetailsData;
  const posterUrl = import.meta.env.VITE_API_POSTER_URL;

  console.log(movie);

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2">
        {movie.title}
        <img src={`${posterUrl}/${movie.poster_path}`} alt="" />
      </div>
    </div>
  );
}

export function loaderMovie({ params }: LoaderFunctionProps) {
  return getMovie('MOVIE', params.id);
}