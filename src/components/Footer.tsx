import { useContext } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// import useRouteData from "@/hooks/useRouteData";

import { Button } from '@/components/ui/button';
import { AppContext } from '@/context/AppProvider';
import { getRoute } from '@/lib/helper';
import { ENav, RouteId } from '@/lib/enums'

export default function Footer({ totalPagesFromResult }: { totalPagesFromResult: number }) {
  const { appState } = useContext(AppContext);
  const rrNavigate = useNavigate();
  const rrParams = useParams();
  // const { totalPagesFromResult } = useRouteData();
  const route = getRoute(appState.routeId).href;

  const pathFilter = rrParams.filter ? '/' + rrParams.filter : '';
  const pathTitle = rrParams.title ? '/' + rrParams.title : '';
  const pathPage = {
    str: rrParams.page || '1',
    num: typeof rrParams.page === 'undefined' ? 1 : Number(rrParams.page)
  };
  const totalPages = {
    str: typeof totalPagesFromResult === 'undefined' ? '0' : String(totalPagesFromResult),
    num: typeof totalPagesFromResult === 'undefined' ? 0 : totalPagesFromResult
  };

  // console.log('route      :', route);
  // console.log('pathFilter :', pathFilter);
  // console.log('pathPage   :', pathPage);
  // console.log('totalPages :', totalPages);

  const handlePagerClick = (navType: number, jump: number) => {
    let url = '';

    if (navType === ENav.PAGE_ONE && pathPage.num > 1) {
      if (
        appState.routeId === RouteId.POPULAR
      ) url = '/1';
      if (
        appState.routeId === RouteId.NOW_PAYING ||
        appState.routeId === RouteId.TOP_RATED ||
        appState.routeId === RouteId.UPCOMING ||
        appState.routeId === RouteId.ON_DVD
      ) url = `${route}/1`;
      if (
        appState.routeId === RouteId.FILTER_BY_YEAR ||
        appState.routeId === RouteId.FILTER_BY_KEYWORD
      ) url = `${route}/${pathFilter}/1`;
      if (
        appState.routeId === RouteId.SIMILAR ||
        appState.routeId === RouteId.FILTER_BY_CAST ||
        appState.routeId === RouteId.FILTER_BY_CREW
      ) url = `${route}/${pathFilter}/${pathTitle}/1`;
    }

    if (navType === ENav.PAGE_NEXT && pathPage.num < totalPages.num) {
      if (
        appState.routeId === RouteId.POPULAR
      ) url = `/${pathPage.num + jump}`;
      if (
        appState.routeId === RouteId.NOW_PAYING ||
        appState.routeId === RouteId.TOP_RATED ||
        appState.routeId === RouteId.UPCOMING ||
        appState.routeId === RouteId.ON_DVD
      ) url = `${route}/${pathPage.num + jump}`;
      if (
        appState.routeId === RouteId.FILTER_BY_YEAR ||
        appState.routeId === RouteId.FILTER_BY_KEYWORD
      ) url = `${route}${pathFilter}/${pathPage.num + jump}`;
      if (
        appState.routeId === RouteId.SIMILAR ||
        appState.routeId === RouteId.FILTER_BY_CAST ||
        appState.routeId === RouteId.FILTER_BY_CREW
      ) url = `${route}/${pathFilter}/${pathTitle}/${pathPage.num + jump}`;
    }

    if (navType === ENav.PAGE_PREV && pathPage.num > 1) {
      if (
        appState.routeId === RouteId.POPULAR
      ) url = `/${pathPage.num + jump}`;
      if (
        appState.routeId === RouteId.NOW_PAYING ||
        appState.routeId === RouteId.TOP_RATED ||
        appState.routeId === RouteId.UPCOMING ||
        appState.routeId === RouteId.ON_DVD
      ) url = `${route}/${pathPage.num + jump}`;
      if (
        appState.routeId === RouteId.FILTER_BY_YEAR ||
        appState.routeId === RouteId.FILTER_BY_KEYWORD
      ) url = `${route}${pathFilter}/${pathPage.num + jump}`;
      if (
        appState.routeId === RouteId.SIMILAR ||
        appState.routeId === RouteId.FILTER_BY_CAST ||
        appState.routeId === RouteId.FILTER_BY_CREW
      ) url = `${route}/${pathFilter}/${pathTitle}/${pathPage.num + jump}`;
    }

    rrNavigate(url);
    window.scrollTo(0, 0);
  }

  return (
    <div className="fixed bottom-0 left-0 w-full h-14 z-10 border-t bg-opacity-80 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <Button
          className=""
          onClick={() => handlePagerClick(ENav.PAGE_ONE, 0)}
          disabled={pathPage.num < 2}
        >First Page</Button>
        <Button
          className="w-full"
          onClick={() => handlePagerClick(ENav.PAGE_PREV, -1)}
          disabled={pathPage.num < 2}
        >Previous Page</Button>
        <Button
          className="w-full"
          onClick={() => handlePagerClick(ENav.PAGE_NEXT, 1)}
          disabled={pathPage.num >= totalPages.num}
        >Next Page</Button>
      </div>
    </div>
  );
}
