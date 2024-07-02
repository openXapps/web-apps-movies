import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider';

// Route components
import Layout from '@/pages/Layout';
import Home, { loaderTrending, loaderOnDvD, loaderFavourites } from '@/pages/Home';
import Movie from '@/pages/Movie';
// import NoPage from '@/pages/NoPage';

export default function App() {
  const home: string = '/apps/movies';
  // const home = '/';

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      // errorElement: <NoPage />,
      children: [
        { index: true, element: <Home />, loader: loaderTrending },
        { path: ':page', element: <Home />, loader: loaderTrending },
        {
          path: 'ondvd', element: <Home />, loader: loaderOnDvD, children: [{
            path: ':page', element: <Home />, loader: loaderOnDvD
          }]
        },
        {
          path: 'favourites', element: <Home />, loader: loaderFavourites, children: [{
            path: ':page', element: <Home />, loader: loaderFavourites
          }]
        },
        { path: 'movie/:id', element: <Movie /> },
      ],
    },
  ], { basename: home })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

