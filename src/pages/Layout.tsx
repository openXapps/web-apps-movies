import { useContext, useEffect } from "react";
import { Outlet, ScrollRestoration, useMatch } from "react-router-dom";

import Header from "@/components/Header";
import Toolbar from "@/components/Toolbar";

import { routes } from "@/lib/routes";
import { AppContext } from "@/context/AppProvider";

export default function Layout() {
  const { appDispatch } = useContext(AppContext);
  const rrMatch = routes.filter(v => useMatch(v.path) ? true : false);

  // This effect controls App Context routeId State
  useEffect(() => {
    if (Array.isArray(rrMatch) && rrMatch.length > 0) {
      appDispatch({ type: 'SET_ROUTEID', payload: rrMatch[rrMatch.length - 1].routeId });
    }
    return () => { }
  }, [])

  return (
    <>
      <ScrollRestoration
        getKey={(location) => {
          const paths = ['/'];
          return paths.includes(location.pathname)
            ? // Root restore by pathname
            location.pathname
            : // everything else by location like the browser
            location.key;
        }}
      />
      <Header />
      <Toolbar />
      <div className="mx-auto max-w-[1024px]">
        <Outlet />
      </div>
    </>
  );
};