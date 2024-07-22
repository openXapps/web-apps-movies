import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

import MovieInfo from "@/components/MovieInfo";
import MovieCast from "@/components/MovieCast";
import MovieRating from "@/components/MovieRating";
import Toolbar from "@/components/Toolbar";
import { getMovie } from "@/lib/api";
import { LoaderFunctionProps, TmdbMovieDetailsData } from "@/lib/types";

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
        <Tabs defaultValue="info" className="mt-3">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="info"
              className={twMerge(
                activeTab.tabName === 'info'
                  ? activeTab.tabCSS
                  : 'text-gray-500 dark:text-gray-400',
                'font-bold')}
              onClick={() => setActiveTab(prevState => ({ ...prevState, tabName: 'info' }))}
            >Info</TabsTrigger>
            <TabsTrigger
              value="cast"
              className={twMerge(
                activeTab.tabName === 'cast'
                  ? activeTab.tabCSS
                  : 'text-gray-500 dark:text-gray-400',
                'font-bold')}
              onClick={() => setActiveTab(prevState => ({ ...prevState, tabName: 'cast' }))}
            >Cast</TabsTrigger>
            <TabsTrigger
              value="rating"
              className={twMerge(
                activeTab.tabName === 'rating'
                  ? activeTab.tabCSS
                  : 'text-gray-500 dark:text-gray-400',
                'font-bold')}
              onClick={() => setActiveTab(prevState => ({ ...prevState, tabName: 'rating' }))}
            >Rating</TabsTrigger>
          </TabsList>
          <TabsContent value="info"><MovieInfo movie={movie} /></TabsContent>
          <TabsContent value="cast"><MovieCast /></TabsContent>
          <TabsContent value="rating"><MovieRating /></TabsContent>
        </Tabs>
        < Toolbar />
      </div>
    </div>
  );
}

export function loaderMovie({ params }: LoaderFunctionProps) {
  return getMovie('MOVIE', params.id);
}