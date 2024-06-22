import { useLocation } from "react-router-dom";
import { RouteItems } from "@/lib/types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";

type NavDesktopProps = React.ComponentPropsWithoutRef<'nav'> & {
  routes: RouteItems;
  isSmall?: boolean;
};

export default function NavDesktop({ routes, isSmall, ...rest }: NavDesktopProps) {
  const { pathname } = useLocation();

  return (
    <nav className={twMerge('flex gap-1', rest.className)}>
      {routes.items.map((v, i) => (i < 3 &&
        <Button key={i} asChild variant={pathname === v.href ? 'default' : 'link'}>
          <Link
            to={v.href}
            className={pathname === v.href ? 'pointer-events-none' : 'pointer-events-auto'}
          >{v.route}</Link>
        </Button>
      ))}
    </nav>
  );
}
