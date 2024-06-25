import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { ThemeProvider } from '@/context/theme-provider';

// Route components
import Layout from '@/pages/Layout';
import Home from '@/pages/Home';
import Movie from '@/pages/Movie';
import NoPage from '@/pages/NoPage';

export default function App() {
  const home: string = '/apps/movies';
  // const home = '/';

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="ondvd" element={<Home />} />
      <Route path="favourites" element={<Home />} />
      <Route path="movie/:id" element={<Movie />} />
      <Route path="*" element={<NoPage />} />
    </Route >
  ), { basename: home });

  // This does not fucken work !!!!!
  // const r = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <Layout />,
  //     errorElement: <NoPage />,
  //     children: [
  //       { index: true, element: <Home /> },
  //       { path: 'ondvd', element: <Home /> },
  //       { path: 'favourites', element: <Home /> },
  //       { path: 'movie/:id', element: <Movie /> }
  //     ],
  //   },
  // ], { basename: home })

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

