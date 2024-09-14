import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import MovieInfo from "@/components/MovieInfo";
import MovieActor from "@/components/MovieActor";
import Toolbar from "@/components/Toolbar";
// import MovieRating from "@/components/MovieRating";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { AppContext } from "@/context/AppProvider";
import ghostBackdrop from '@/assets/ghost-backdrop.jpg';
import type { TmdbMovieDetailsData } from "@/lib/types";

type ActiveTabProps = 'info' | 'actors' | 'rating';

export default function Movie({ routeId }: { routeId: number }) {
  const { appDispatch } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<ActiveTabProps>('info');
  const movieInfo = useLoaderData() as TmdbMovieDetailsData;
  const backdropUrl = import.meta.env.VITE_API_MOVIE_BACKDROP_URL;

  useEffect(() => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId });
    return () => { }
  }, [routeId])

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2">
        <p className="text-orange-800 dark:text-orange-400 font-bold text-xl sm:text-3xl text-ellipsis overflow-hidden text-nowrap">{movieInfo.title}</p>
        <p className="text-gray-500 dark:text-gray-400">{movieInfo.tagline}</p>
        <img
          id="movie-backdrop"
          className="w-full mt-2"
          src={`${backdropUrl}/${movieInfo.backdrop_path}`}
          alt={movieInfo.title}
          onError={() => (document.getElementById('movie-backdrop') as HTMLImageElement).src = ghostBackdrop}
        />
        <div className="mt-3 flex gap-3 justify-between flex-nowrap">
          <Button
            className="w-full"
            variant={activeTab === 'info' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('info')}
          >Info</Button>
          <Button
            className="w-full"
            variant={activeTab === 'actors' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('actors')}
          >Actors</Button>
          {/* <Button
            className="w-full"
            variant={activeTab === 'rating' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('rating')}
          >Rating</Button> */}
        </div>
        <Separator orientation="horizontal" className="my-3" />
        <div>
          {activeTab === 'info' && <MovieInfo movieInfo={movieInfo} />}
          {activeTab === 'actors' && <MovieActor movieId={String(movieInfo.id)} />}
          {/* {activeTab === 'rating' && <MovieRating />} */}
        </div>
        < Toolbar />
      </div>
    </div>
  );
}

