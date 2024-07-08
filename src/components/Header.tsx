import { useState, useEffect } from 'react'
import { useLocation, useMatches, useNavigate, useParams } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { ArrowLeft } from "lucide-react";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import useMediaQuery from '@/hooks/useMediaQuery';
import { navigation } from '@/lib/data';
import { Button } from './ui/button';
import useRoute from '@/hooks/useRoute';
import { RouteItems } from '@/lib/types';

// https://hawkapps.io/responsive-navbar-in-react-using-shadcn-ui-and-tailwind-css/

export default function Header() {
  const rrNavigate = useNavigate();
  const rrParams = useParams();
  const {pathname} = useLocation();
  const isSmall = useMediaQuery('640');
  const [headerTitle, setHeaderTitle] = useState<string | undefined>('Movies');
  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const route = useRoute(pathname, rrParams.page || rrParams.id);

  useEffect(() => {
    let arr: RouteItems = navigation.filter(v => v.href === route);
    isSmall ? setHeaderTitle(arr[0].title) : setHeaderTitle('Movies');
    setShowBackButton(arr[0].navBack);

    return () => { }
  }, [isSmall, route])

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-10 border-b bg-opacity-90 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <h1 className="text-xl font-bold grow">{headerTitle}</h1>
        {showBackButton ? (
          <Button variant="ghost" size="icon" onClick={() => rrNavigate(-1)}>
            <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">navigate back</span>
          </Button>
        ) : (
          <>
            <NavDesktop routes={navigation} />
            <NavMobile routes={navigation} className="block sm:hidden" />
          </>
        )}
        <ModeToggle />
      </div>
    </header >
  );
}
