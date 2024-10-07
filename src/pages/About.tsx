import { useContext, useEffect } from 'react';

import { AppContext } from '@/context/AppProvider';
import TMDbLogo from '@/assets/tmdb-logo.svg';

export default function About({ routeId }: { routeId: number }) {
  const { appDispatch } = useContext(AppContext);

  useEffect(() => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId })
    return () => { }
  }, [routeId])

  return (
    <div className='m-6 flex gap-6 flex-col place-items-center text-center text-xl'>
      <p>This movies information web app is a pet project, built by me, a person who loves developing in React as a hobby. The source code of this project can be found on <span><a className='text-orange-400' href="https://github.com/openXapps/web-apps-movies" target='_blank' rel="noopener noreferrer">GitHub</a></span>.</p>
      <p>If you are a geek like me, you'll get excited to know this app was built with React, React Router DOM, Vite, TypeScript, Tailwind, and Shadcn/ui.</p>
      <p>The underlining API is driven by <span><a className='text-orange-400' href="https://www.themoviedb.org/" target='_blank' rel="noopener noreferrer">The Movie Database (TMDb)</a></span>. My project wouldn't have been possible without this API and for that, I'm humbled and grateful.</p>
      <p>Please support TMDb by visiting their web site. Create an account with them and actively contribute to help build the world's best and most complete reference database for all movies and TV series.</p>
      <a className='mt-5' href="https://www.themoviedb.org/" target='_blank' rel="noopener noreferrer">
        <img width={200} src={TMDbLogo} alt="the movie database logo" />
      </a>
    </div>
  );
}
