import { useNavigate, useLocation } from "react-router-dom";
import { RouteItems } from "@/lib/types";
import { twMerge } from "tailwind-merge";
import { Button } from "./ui/button";
import useRoute from "@/hooks/useRoute";

export default function NavDesktop({ routes }: { routes: RouteItems }) {
  const rrNavigate = useNavigate();
  const { pathname } = useLocation();
  const route = useRoute(pathname);

  const handleButtonClick = (href: string) => {
    rrNavigate(href, { replace: true });
  };

  return (
    <nav className="hidden sm:flex">
      {routes.map((v, i) => {
        const isActive = route === v.href
        return (i < 3 &&
          <Button
            key={i}
            variant={isActive ? 'outline' : 'link'}
            onClick={() => handleButtonClick(v.href)}
            className={twMerge(isActive ? 'pointer-events-none' : '')}
          // disabled={pathname === v.href}
          >{v.route}<span className="sr-only">{`navigate to ${v.route}`}</span></Button>
        )
      })}
    </nav>
  );
}
