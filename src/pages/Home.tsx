import { useState } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { TmdbMovieList } from '@/lib/types';
import { getMovies } from '@/lib/api';
import MovieCard from "@/components/MovieCard";

export default function Home() {
  const movies = useLoaderData() as TmdbMovieList;
  const rrLocation = useLocation();
  const rrNavigate = useNavigate();
  // const [page, setPage] = useState(1);

  const handlePagerClick = (navType: string, jump: number) => {
    const page = new URLSearchParams(rrLocation.search).get('page');
    console.log('rr=', rrLocation.search, ' page=', page);

    if (navType === 'PAGE_ONE') {
      rrNavigate(`${rrLocation.pathname}/1`);
    }
    if (navType === 'PAGE_NEXT' && rrLocation.pathname === '/' && !page && jump === 1) {
      rrNavigate(`${rrLocation.pathname}/2`);
    }
    if (navType === 'PAGE_NEXT' && page && jump === 1) {
      rrNavigate(`${rrLocation.pathname}/${Number(page) + jump}`);
    }
    if (navType === 'PAGE_PREV' && page && jump === (-1)) {
      Number(page) > 1 && rrNavigate(`${rrLocation.pathname}/${Number(page) + (jump)}`);
    }
  }

  return (
    <div className="mt-2">
      <div className="flex justify-between m-3 gap-3">
        <Button className="" onClick={() => handlePagerClick('PAGE_ONE', 0)}>Page 1</Button>
        <Button className="w-full" onClick={() => handlePagerClick('PAGE_PREV', -1)}>Previous Page</Button>
        <Button className="w-full" onClick={() => handlePagerClick('PAGE_NEXT', 1)}>Next Page</Button>
      </div>
      <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
        {movies.results.map(v => (
          <MovieCard
            key={v.id}
            movieId={v.id}
            movieTitle={v.title}
            movieImage={`https://image.tmdb.org/t/p/w500/${v.poster_path}`}
          // favourite={false}
          />
        ))}
      </div>
    </div>
  )
}

export function loaderTrending({ params }: { params: any }) {
  return getMovies('/', params.page || '1');
}

export function loaderOnDvD({ params }: { params: any }) {
  return getMovies('/ondvd', params.page || '1');
}

export function loaderFavourites() {
  return getMovies('/favourites', '0');
}