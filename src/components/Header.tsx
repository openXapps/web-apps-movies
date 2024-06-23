import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import { navigation } from '@/lib/data';
import useMediaQuery from '@/hooks/useMediaQuery';

// https://hawkapps.io/responsive-navbar-in-react-using-shadcn-ui-and-tailwind-css/

export default function Header() {
  const [headerTitle, setHeaderTitle] = useState<string | undefined>('Movies');
  const { pathname } = useLocation();
  const isSmall = useMediaQuery('640');

  useEffect(() => {
    if (isSmall) {
      let title = navigation.filter((v) => (
        pathname === v.href ||
        (v.href.length > 1 && pathname.startsWith(v.href))
      ));
      setHeaderTitle(title[0].title);
    } else { setHeaderTitle('Movies') }

    return () => { }
  }, [pathname, isSmall])

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-10 border-b bg-opacity-80 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <h1 className="text-xl font-bold grow">{headerTitle}</h1>
        <NavDesktop routes={navigation} className="hidden sm:block" />
        <NavMobile routes={navigation} className="block sm:hidden" />
        <ModeToggle />
      </div>
    </header>
  )
}
