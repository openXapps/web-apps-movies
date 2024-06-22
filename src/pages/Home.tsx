// import { useEffect } from 'react';
import MovieCard from "@/components/MovieCard";
// import { useLocation } from "react-router-dom";

const mockData = [
  {key: 1, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name'},
  {key: 2, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name That Is Very Very Very Long'},
  {key: 3, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Short'},
  {key: 4, id: '1E5baAaEse26fej7uHcjOgEE2t2', title: 'Movie Name'},
]

export default function Home() {
  // const location = useLocation();

  // useEffect(() => {
  //   console.log(location.pathname);
  //   return () => { }
  // }, [location.pathname])

  return (
    <div className="mt-2">
      <div className="max-w-[1024px] mx-auto my-2 p-2 grid gap-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center border border-cyan-400">
        {mockData.map(v => (
          <MovieCard key={v.key} movieId={v.id} movieTitle={v.title} movieImage="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg" />
        ))}
      </div>
    </div>
  )
}
