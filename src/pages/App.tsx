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

import { RouteId } from '@/lib/enums';
import { AppProvider } from '@/context/AppProvider';
import { getRoute } from '@/lib/helper';

export default function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home routeId={RouteId.NOW_PAYING} />,
          loader: getRoute(RouteId.NOW_PAYING).loader
        },
        {
          path: getRoute(RouteId.NOW_PAYING).path,
          element: <Home routeId={RouteId.NOW_PAYING} />,
          loader: getRoute(RouteId.NOW_PAYING).loader
        },
        {
          path: getRoute(RouteId.POPULAR).path,
          element: <Home routeId={RouteId.POPULAR} />,
          loader: getRoute(RouteId.POPULAR).loader
        },
        {
          path: getRoute(RouteId.TOP_RATED).path,
          element: <Home routeId={RouteId.TOP_RATED} />,
          loader: getRoute(RouteId.TOP_RATED).loader
        },
        {
          path: getRoute(RouteId.UPCOMING).path,
          element: <Home routeId={RouteId.UPCOMING} />,
          loader: getRoute(RouteId.UPCOMING).loader
        },
        {
          path: getRoute(RouteId.ON_DVD).path,
          element: <Home routeId={RouteId.ON_DVD} />,
          loader: getRoute(RouteId.ON_DVD).loader
        },
        {
          path: getRoute(RouteId.SIMILAR).path,
          element: <Home routeId={RouteId.SIMILAR} />,
          loader: getRoute(RouteId.SIMILAR).loader
        },
        {
          path: getRoute(RouteId.FILTER_BY_YEAR).path,
          element: <Home routeId={RouteId.FILTER_BY_YEAR} />,
          loader: getRoute(RouteId.FILTER_BY_YEAR).loader
        },
        {
          path: getRoute(RouteId.FILTER_BY_KEYWORD).path,
          element: <Home routeId={RouteId.FILTER_BY_KEYWORD} />,
          loader: getRoute(RouteId.FILTER_BY_KEYWORD).loader
        },
        {
          path: getRoute(RouteId.MOVIE_BIOGRAPHY).path,
          element: <Movie routeId={RouteId.MOVIE_BIOGRAPHY} />,
          loader: getRoute(RouteId.MOVIE_BIOGRAPHY).loader
        },
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

