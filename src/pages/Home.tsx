// import { useEffect } from 'react';
import Card from "@/components/Card";
// import { useLocation } from "react-router-dom";

const mockData = [
  {id: 0, title: 'Movie Name'},
  {id: 2, title: 'Movie Name That Is Very Very Very Long'},
  {id: 3, title: 'Short'},
  {id: 4, title: 'Movie Name'},
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
          <Card key={v.id}>{v.title}</Card>
        ))}
      </div>
    </div>
  )
}
