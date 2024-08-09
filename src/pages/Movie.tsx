import { useState } from "react";
import { useLoaderData } from "react-router-dom";

import MovieInfo from "@/components/MovieInfo";
import MovieCast from "@/components/MovieCast";
import MovieRating from "@/components/MovieRating";
import Toolbar from "@/components/Toolbar";
import { getMovie } from "@/lib/api";
import { LoaderFunctionProps, TmdbMovieDetailsData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ActiveTabProps = {
  tabName: 'info' | 'cast' | 'rating';
  tabCSS: string;
}

export default function Movie() {
  const [activeTab, setActiveTab] = useState<ActiveTabProps>({ tabName: 'info', tabCSS: 'text-orange-500 pointer-events-none ring-1 rounded-md py-2' });
  const movie = useLoaderData() as TmdbMovieDetailsData;
  const backdropUrl = import.meta.env.VITE_API_BACKDROP_URL;
  // const posterUrl = import.meta.env.VITE_API_POSTER_URL;

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2">
        <p className="text-orange-800 dark:text-orange-400 font-bold text-xl sm:text-3xl text-ellipsis overflow-hidden text-nowrap">{movie.title}</p>
        {/* <img className="" src={`${posterUrl}/${movie.poster_path}`} alt="X" /> */}
        <p className="text-gray-500 dark:text-gray-400">{movie.tagline}</p>
        <img className="w-full mt-2" src={`${backdropUrl}/${movie.backdrop_path}`} alt={movie.title} />
        <div className="mt-3 flex gap-3 justify-between flex-nowrap">
          {/* <Button className={twMerge(activeTab ? '' : '', 'w-full')}>Info</Button> */}
          <Button
            className="w-full"
            variant={activeTab.tabName === 'info' ? 'default' : 'ghost'}
            onClick={() => setActiveTab(prevState => ({ ...prevState, tabName: 'info' }))}
          >Info</Button>
          <Button
            className="w-full"
            variant={activeTab.tabName === 'cast' ? 'default' : 'ghost'}
            onClick={() => setActiveTab(prevState => ({ ...prevState, tabName: 'cast' }))}
          >Cast</Button>
          <Button
            className="w-full"
            variant={activeTab.tabName === 'rating' ? 'default' : 'ghost'}
            onClick={() => setActiveTab(prevState => ({ ...prevState, tabName: 'rating' }))}
          >Rating</Button>
        </div>
        <Separator orientation="horizontal" className="my-3" />
        <div>
          {activeTab.tabName === 'info' && <MovieInfo movie={movie} />}
          {activeTab.tabName === 'cast' && <MovieCast />}
          {activeTab.tabName === 'rating' && <MovieRating />}
        </div>
        < Toolbar />
      </div>
    </div>
  );
}

export function loaderMovie({ params }: LoaderFunctionProps) {
  return getMovie('MOVIE', params.id);
}