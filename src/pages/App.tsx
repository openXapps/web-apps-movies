import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider';

// Route components
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import Movie, { loaderMovie } from '@/pages/Movie';
import NoPage from '@/pages/NoPage';
import {
  routes,
  loaderNowPlaying,
  loaderPopular,
  loaderTopRated,
  loaderUpcoming,
  loaderOnDvD,
  loaderFavourites,
  loaderSimilar,
} from '@/lib/routes';
import { StoreContextProvider } from '@/context/StoreProvider';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home />, loader: loaderNowPlaying },
        { path: routes[0].path, element: <Home />, loader: loaderNowPlaying },
        { path: routes[1].path, element: <Home />, loader: loaderPopular },
        { path: routes[2].path, element: <Home />, loader: loaderTopRated },
        { path: routes[3].path, element: <Home />, loader: loaderUpcoming },
        { path: routes[4].path, element: <Home />, loader: loaderOnDvD },
        { path: routes[5].path, element: <Home />, loader: loaderSimilar },
        { path: routes[6].path, element: <Home />, loader: loaderFavourites },
        { path: routes[7].path, element: <Movie />, loader: loaderMovie },
      ],
      errorElement: <NoPage />,
    },
  ], { basename: '/apps/movies' })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <StoreContextProvider>
        <RouterProvider router={router} />
      </StoreContextProvider>
    </ThemeProvider>
  );
}

