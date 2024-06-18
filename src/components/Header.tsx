// import { useState } from 'react'
// import { Link } from 'react-router-dom'
import { RouteItems } from "@/lib/types";
import { ModeToggle } from "./ModeToggle";
import NavDesktop from "./NavDesktop";

const navigation: RouteItems = {
  items: [
    { route: 'Now Showing', href: '/' },
    { route: 'On DVD', href: '/ondvd' },
    { route: 'Favourites', href: '/favourites' },
  ]
}

// https://hawkapps.io/responsive-navbar-in-react-using-shadcn-ui-and-tailwind-css/

export default function Header() {

  return (
    <header className="fixed top-0 w-full h-14 flex items-center py-1 px-2 border-b gap-2 bg-slate-100 dark:bg-slate-800">
      <h1 className="text-xl font-bold grow">Movies</h1>
      <NavDesktop routes={navigation} />
      <ModeToggle></ModeToggle>
    </header>
  )
}
