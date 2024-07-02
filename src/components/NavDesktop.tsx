import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { RouteItems } from "@/lib/types";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";

export default function NavDesktop({ routes, className }: { routes: RouteItems, className: string }) {
  const { pathname } = useLocation();
  const rrNavigate = useNavigate();
  // const rrMatch = useMatch(pathname);

  // console.log(`x:${pathname.slice(0, pathname.lastIndexOf('/'))}:`);
  
  const handleButtonClick = (href: string) => {
    rrNavigate(href, { replace: true });
  };

  return (
    <nav className={twMerge('flex gap-1', className)}>
      {routes.map((v, i) => (i < 3 &&
        <Button
          key={i}
          // variant={pathname.search(/\/\d/g) > -1 ? 'default' : 'link'}
          // variant={ ? 'default' : 'link'}
          onClick={() => handleButtonClick(v.href)}
          className={twMerge(pathname === v.href ? 'cursor-context-menu' : 'cursor-pointer')}
          // disabled={pathname === v.href}
        >{v.route}<span className="sr-only">{`navigate ${v.route}`}</span></Button>
      ))}
    </nav>
  );
}
