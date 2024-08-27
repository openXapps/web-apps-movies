import { useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import useRouteData from "@/hooks/useRouteData";
import { Button } from "./ui/button";
import { ENav } from '@/lib/enums'
import { AppContext } from '@/context/AppProvider';
import { getRoute } from '@/lib/helper';

export default function Footer() {
  const { appState } = useContext(AppContext);
  const rrNavigate = useNavigate();
  const rrParams = useParams();
  const { total_pages } = useRouteData();
  const route = getRoute(appState.routeId).href;
  
  const currentMovieId = rrParams.movieid ? '/' + rrParams.movieid : '';
  const currentPage = {
    str: rrParams.page || '1',
    num: typeof rrParams.page === 'undefined' ? 1 : Number(rrParams.page)
  };
  const totalPages = {
    str: typeof total_pages === 'undefined' ? '0' : total_pages.toString(),
    num: typeof total_pages === 'undefined' ? 0 : Number(total_pages)
  };

  // console.log('currentPage :', currentPage);
  // console.log('totalPages  :', totalPages);

  const handlePagerClick = (navType: number, jump: number) => {
    if (navType === ENav.PAGE_ONE && currentPage.num > 1)
      rrNavigate(`${route}${currentMovieId}/1`);
    if (navType === ENav.PAGE_NEXT && currentPage.num < totalPages.num)
      rrNavigate(`${route}${currentMovieId}/${currentPage.num + jump}`);
    if (navType === ENav.PAGE_PREV && currentPage.num > 1)
      rrNavigate(`${route}${currentMovieId}/${currentPage.num + (jump)}`);

    window.scrollTo(0, 0);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-14 z-10 border-t bg-opacity-80 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <Button
          className=""
          onClick={() => handlePagerClick(ENav.PAGE_ONE, 0)}
          disabled={currentPage.num < 2}
        >First Page</Button>
        <Button
          className="w-full"
          onClick={() => handlePagerClick(ENav.PAGE_PREV, -1)}
          disabled={currentPage.num < 2}
        >Previous Page</Button>
        <Button
          className="w-full"
          onClick={() => handlePagerClick(ENav.PAGE_NEXT, 1)}
          disabled={currentPage.num >= totalPages.num}
        >Next Page</Button>
      </div>
    </div>
  );
}
