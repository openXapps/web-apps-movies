// import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import { RouteItem } from "@/lib/types";
import { AppContext } from "@/context/AppProvider";
// import useRoute from "@/hooks/useRoute";

export default function NavDesktop({ routes }: { routes: RouteItem[] }) {
  const { appState, appDispatch } = useContext(AppContext);
  const rrNavigate = useNavigate();
  // const { pathname } = useLocation();
  // const rrParams = useParams();
  // const route = useRoute(pathname, rrParams);

  const handleButtonClick = (routeId: number) => {
    appDispatch({ type: 'SET_ROUTEID', payload: routeId });
    rrNavigate(routes[routeId].href, { replace: true });
  };

  return (
    <nav className="hidden sm:flex">
      {routes.map((v, i) => {
        // const isActive = route === v.href
        const isActive = v.routeId === appState.routeId
        return (i < 5 &&
          <Button
            key={i}
            variant={isActive ? 'outline' : 'link'}
            onClick={() => handleButtonClick(v.routeId)}
            className={twMerge(isActive ? 'pointer-events-none' : '')}
          // disabled={pathname === v.href}
          >{v.menuItem}<span className="sr-only">{`navigate to ${v.menuItem}`}</span></Button>
        )
      })}
    </nav>
  );
}
