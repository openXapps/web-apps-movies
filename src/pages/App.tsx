import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider';

// Route components
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import Movie from '@/pages/Movie';
import NoPage from '@/pages/NoPage';

import { routes, RouteId } from '@/lib/routes';
import { AppProvider } from '@/context/AppProvider';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home routeId={RouteId.NOW_PAYING} />, loader: routes[RouteId.NOW_PAYING].loader },
        { path: routes[RouteId.NOW_PAYING].path, element: <Home routeId={RouteId.NOW_PAYING} />, loader: routes[RouteId.NOW_PAYING].loader },
        { path: routes[RouteId.POPULAR].path, element: <Home routeId={RouteId.POPULAR} />, loader: routes[RouteId.POPULAR].loader },
        { path: routes[RouteId.TOP_RATED].path, element: <Home routeId={RouteId.TOP_RATED} />, loader: routes[RouteId.TOP_RATED].loader },
        { path: routes[RouteId.UPCOMING].path, element: <Home routeId={RouteId.UPCOMING} />, loader: routes[RouteId.UPCOMING].loader },
        { path: routes[RouteId.ON_DVD].path, element: <Home routeId={RouteId.ON_DVD} />, loader: routes[RouteId.ON_DVD].loader },
        { path: routes[RouteId.SIMILAR].path, element: <Home routeId={RouteId.SIMILAR} />, loader: routes[RouteId.SIMILAR].loader },
        { path: routes[RouteId.FAVOURITES].path, element: <Home routeId={RouteId.FAVOURITES} />, loader: routes[RouteId.FAVOURITES].loader },
        { path: routes[RouteId.MOVIE_BIOGRAPHY].path, element: <Movie routeId={RouteId.MOVIE_BIOGRAPHY} />, loader: routes[RouteId.MOVIE_BIOGRAPHY].loader },
      ],
      errorElement: <NoPage />,
    },
  ], { basename: '/apps/movies' })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppProvider>
        <RouterProvider router={router} future={{ v7_startTransition: true }} />
      </AppProvider>
    </ThemeProvider>
  );
}

