// import { useEffect } from 'react';
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  // useEffect(() => {
  //   console.log(location.pathname);
  //   return () => { }
  // }, [location.pathname])

  return (
    <div className="p-10">
      <p className="">{location.pathname}</p>
    </div>
  )
}
