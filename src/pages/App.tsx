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
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home />, loader: loaderTrending },
        { path: ':page?', element: <Home />, loader: loaderTrending },
        { path: 'ondvd/:page?', element: <Home />, loader: loaderOnDvD },
        { path: 'favourites', element: <Home />, loader: loaderFavourites },
        { path: 'movie/:id', element: <Movie /> },
      ],
      // errorElement: <NoPage />,
    },
  ], { basename: '/apps/movies' })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

