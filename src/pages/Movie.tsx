import { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

import MovieInfo from "@/components/MovieInfo";
import MovieCast from "@/components/MovieCast";
import MovieCrew from "@/components/MovieCrew";
import MovieBackdrop from "@/components/MovieBackdrop";
import Toolbar from "@/components/Toolbar";
// import MovieRating from "@/components/MovieRating";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { AppContext } from "@/context/AppProvider";
import type { TmdbMovieDetailsData } from "@/lib/types";

type ActiveTabProps = 'backdrop' | 'info' | 'cast' | 'crew' | 'rating';

export default function Movie({ routeId }: { routeId: number }) {
  const { appDispatch } = useContext(AppContext);
  const [activeTab, setActiveTab] = useState<ActiveTabProps>('backdrop');
  const movieInfo = useLoaderData() as TmdbMovieDetailsData;

  useEffect(() => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId });
    return () => { }
  }, [routeId])

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2">
        <p className="text-orange-800 dark:text-orange-400 font-bold text-xl sm:text-3xl text-ellipsis overflow-hidden text-nowrap">{movieInfo.title}</p>
        <p className="text-gray-500 dark:text-gray-400">{movieInfo.tagline}</p>
        {/* <MovieBackdrop movieId={String(movieInfo.id)} fallBack={movieInfo.backdrop_path} /> */}
        <div className="mt-3 flex gap-3 justify-between flex-nowrap">
          <Button
            className="w-full"
            variant={activeTab === 'backdrop' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('backdrop')}
          >Posters</Button>
          <Button
            className="w-full"
            variant={activeTab === 'info' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('info')}
          >Info</Button>
          <Button
            className="w-full"
            variant={activeTab === 'cast' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('cast')}
          >Cast</Button>
          <Button
            className="w-full"
            variant={activeTab === 'crew' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('crew')}
          >Crew</Button>
          {/* <Button
            className="w-full"
            variant={activeTab === 'rating' ? 'default' : 'ghost'}
            onClick={() => setActiveTab('rating')}
          >Rating</Button> */}
        </div>
        <Separator orientation="horizontal" className="my-3" />
        <div>
          {activeTab === 'backdrop' && <MovieBackdrop movieId={String(movieInfo.id)} fallBack={movieInfo.backdrop_path} />}
          {activeTab === 'info' && <MovieInfo movieInfo={movieInfo} />}
          {activeTab === 'cast' && <MovieCast movieId={String(movieInfo.id)} layout="vertical" />}
          {activeTab === 'crew' && <MovieCrew movieId={String(movieInfo.id)} layout="vertical" />}
          {/* {activeTab === 'rating' && <MovieRating movieId={String(movieInfo.id)} />} */}
        </div>
        < Toolbar />
      </div>
    </div>
  );
}

