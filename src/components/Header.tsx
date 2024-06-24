import { useState, useEffect } from 'react'
import { useMatches, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { ArrowLeft } from "lucide-react";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";
import useMediaQuery from '@/hooks/useMediaQuery';
import { navigation } from '@/lib/data';
import { Button } from './ui/button';

// https://hawkapps.io/responsive-navbar-in-react-using-shadcn-ui-and-tailwind-css/

export default function Header() {
  const [headerTitle, setHeaderTitle] = useState<string | undefined>('Movies');
  const isSmall = useMediaQuery('640');
  const [showBackButton, setShowBackButton] = useState<boolean>(false);
  const rrNavigate = useNavigate();
  const routeId = useMatches().at(-1)?.id;

  useEffect(() => {
    let arr = navigation.filter(v => v.id === routeId);
    isSmall ? setHeaderTitle(arr[0].title) : setHeaderTitle('Movies');
    setShowBackButton(arr[0].navBack);

    return () => { }
  }, [isSmall, routeId])

  // console.log('Render ', new Date());

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-10 border-b bg-opacity-80 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <h1 className="text-xl font-bold grow">{headerTitle}</h1>
        {showBackButton ? (
          <Button variant="ghost" size="icon" onClick={() => rrNavigate(-1)}>
            <ArrowLeft className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">navigate back</span>
          </Button>
        ) : (
          <>
            <NavDesktop routes={navigation} className="hidden sm:block" />
            <NavMobile routes={navigation} className="block sm:hidden" />
          </>
        )}
        <ModeToggle />
      </div>
    </header >
  );
}
