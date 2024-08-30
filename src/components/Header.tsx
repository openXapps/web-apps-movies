import { useState, useEffect, useContext } from 'react'
import { useNavigate } from "react-router-dom";

import { Button } from './ui/button';
import { ArrowLeft } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

import { routes } from '@/lib/routes';
import { getRoute } from '@/lib/helper';
import { AppContext } from '@/context/AppProvider';

// import useRoute from '@/hooks/useRoute';
// import useMediaQuery from '@/hooks/useMediaQuery';
// import { RouteItem } from '@/lib/types';

// https://hawkapps.io/responsive-navbar-in-react-using-shadcn-ui-and-tailwind-css/

export default function Header() {
  const { appState } = useContext(AppContext);
  const [route, setRoute] = useState(getRoute(appState.routeId));
  const rrNavigate = useNavigate();

  useEffect(() => {
    setRoute(getRoute(appState.routeId));

    return () => { };
  }, [appState.routeId])

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-10 border-b bg-opacity-90 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <h1 className="text-xl font-bold grow">{route.header}</h1>
        {route.navBack ? (
          <Button variant="ghost" size="icon" onClick={() => rrNavigate(-1)}>
            <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">navigate back</span>
          </Button>
        ) : (
          <>
            <NavDesktop routes={routes} />
            <NavMobile routes={routes} className="block sm:hidden" />
          </>
        )}
        <ModeToggle />
      </div>
    </header >
  );
}
