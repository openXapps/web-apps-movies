import { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom";
import { RouteItems } from "@/lib/types";
import { ModeToggle } from "./ModeToggle";
import NavDesktop from "./NavDesktop";
import NavMobile from "./NavMobile";

const navigation: RouteItems = {
  items: [
    { route: 'Now Showing', href: '/', title: 'Movies Now Showing' },
    { route: 'On DVD', href: '/ondvd', title: 'Movies On DVD' },
    { route: 'Favourites', href: '/favourites', title: 'Favourite Movies' },
  ]
}

// https://hawkapps.io/responsive-navbar-in-react-using-shadcn-ui-and-tailwind-css/

export default function Header() {
  const [headerTitle, setHeaderTitle] = useState<string | undefined>('Movies');
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.matchMedia("(max-width: 640px)").matches) {
      let title = navigation.items.filter((v) => pathname === v.href);
      setHeaderTitle(title[0].title);
    }

    return () => { }
  }, [pathname])

  return (
    <header className="fixed top-0 left-0 w-full h-14 border-b bg-slate-100 dark:bg-gray-900">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-3 sm:px-4 mx-auto max-w-7xl">
        <h1 className="text-xl font-bold grow">{headerTitle}</h1>
        <NavDesktop routes={navigation} className="hidden sm:block" />
        <NavMobile routes={navigation} className="block sm:hidden" />
        <ModeToggle />
      </div>
    </header>
  )
}
