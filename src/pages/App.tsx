import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider';

// Route components
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import Movie from '@/pages/Movie';
// import NoPage from '@/pages/NoPage';

import { routes, RouteId } from '@/lib/routes';
import { AppProvider } from '@/context/AppProvider';

/**
 * TODO
 * Need to implement getRoute() on children routes
 * and not fixed array positioning
 */

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home />, loader: routes[RouteId.NOW_PAYING].loader },
        { path: routes[RouteId.NOW_PAYING].path, element: <Home />, loader: routes[RouteId.NOW_PAYING].loader },
        { path: routes[RouteId.POPULAR].path, element: <Home />, loader: routes[RouteId.POPULAR].loader },
        { path: routes[RouteId.TOP_RATED].path, element: <Home />, loader: routes[RouteId.TOP_RATED].loader },
        { path: routes[RouteId.UPCOMING].path, element: <Home />, loader: routes[RouteId.UPCOMING].loader },
        { path: routes[RouteId.ON_DVD].path, element: <Home />, loader: routes[RouteId.ON_DVD].loader },
        { path: routes[RouteId.SIMILAR].path, element: <Home />, loader: routes[RouteId.SIMILAR].loader },
        { path: routes[RouteId.FAVOURITES].path, element: <Home />, loader: routes[RouteId.FAVOURITES].loader },
        { path: routes[RouteId.MOVIE_BIOGRAPHY].path, element: <Movie />, loader: routes[RouteId.MOVIE_BIOGRAPHY].loader },
      ],
      // errorElement: <NoPage />,
    },
  ], { basename: '/apps/movies' })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <RouterProvider router={router} />
      </AppProvider>
    </ThemeProvider>
  );
}

