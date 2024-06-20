// import { useEffect } from 'react';
import Card from "@/components/Card";
import { useLocation } from "react-router-dom";

const mockData = [
  {id: 0},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
]

export default function Home() {
  const location = useLocation();

  // useEffect(() => {
  //   console.log(location.pathname);
  //   return () => { }
  // }, [location.pathname])

  return (
    <div className="py-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
      {/* <div className="grid gap-2 justify-center"> */}
        {mockData.map(v => (
          <Card key={v.id}>{'Card Number ' + v.id}</Card>
        ))}
      </div>
    </div>
  )
}
