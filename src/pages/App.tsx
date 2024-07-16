import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider';

// Route components
import Layout from '@/pages/Layout';
import Home, {
  loaderNowPlaying,
  loaderPopular,
  loaderTopRated,
  loaderUpcoming,
  loaderOnDvD,
  loaderFavourites
} from '@/pages/Home';
import Movie, { loaderMovie } from '@/pages/Movie';
import NoPage from '@/pages/NoPage';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home />, loader: loaderNowPlaying },
        { path: ':page?', element: <Home />, loader: loaderNowPlaying },
        { path: 'popular/:page?', element: <Home />, loader: loaderPopular },
        { path: 'toprated/:page?', element: <Home />, loader: loaderTopRated },
        { path: 'upcoming/:page?', element: <Home />, loader: loaderUpcoming },
        { path: 'ondvd/:page?', element: <Home />, loader: loaderOnDvD },
        { path: 'favourites', element: <Home />, loader: loaderFavourites },
        { path: 'movie/:id', element: <Movie />, loader: loaderMovie },
      ],
      errorElement: <NoPage />,
    },
  ], { basename: '/apps/movies' })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

