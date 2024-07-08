import { getMovie } from "@/lib/api";
import { useLoaderData } from "react-router-dom";

export default function Movie() {
  const movie = useLoaderData();

  console.log(movie);
  
  return (
    <div>Movie</div>
  );
}

export function loaderMovie({ params }: { params: { id: string } }) {
  return getMovie('/', params.id);
}