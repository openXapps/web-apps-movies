import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { TmdbMovieList } from '@/lib/types';
import { getMovies } from '@/lib/api';
import MovieCard from "@/components/MovieCard";
import Pager from '@/components/Pager';

export default function Home() {
  const movies = useLoaderData() as TmdbMovieList;
  const rrLocation = useLocation();
  const rrNavigate = useNavigate();

  const handlePagerClick = (jump: number) => {
    const page = new URLSearchParams(rrLocation.search).get('page');

    if (rrLocation.pathname === '/' && !page && jump === 1) {
      rrNavigate(`${rrLocation.pathname}?page=2`);
    }

    if (page && jump === 1) {
      rrNavigate(`${rrLocation.pathname}?page=${Number(page) + jump}`);
    }

    if (page && jump === (-1) && Number(page) > 1) {
      rrNavigate(`${rrLocation.pathname}?page=${Number(page) + (jump)}`);
    }
  }

  return (
    <div className="mt-2">
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
      <Pager handlePagerClick={handlePagerClick} />
    </div>
  )
}

export function loaderTrending({ request }: { request: any }) {
  const page = new URL(request.url).searchParams.get('page');
  return getMovies('/', page || '1');
}

export function loaderOnDvD({ request }: { request: any }) {
  const page = new URL(request.url).searchParams.get('page');
  return getMovies('/ondvd', page || '1');
}

export function loaderFavourites() {
  return getMovies('/favourites', '0');
}