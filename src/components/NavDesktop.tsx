import { useLocation } from "react-router-dom";
import { RouteItems } from "@/lib/types";
import { Link } from "react-router-dom";
import { buttonVariants } from "./ui/button";

type NavDesktopProps = { routes: RouteItems };

export default function NavDesktop({ routes }: NavDesktopProps) {
  const { pathname } = useLocation();

  return (
    <nav className="flex">
      {routes.items.map((v, i) => {
        return (
          <Link
            key={i}
            to={v.href}
            className={buttonVariants({ variant: pathname === v.href ? 'default' : 'ghost' })}
          >{v.route}</Link>
        );
      })}
    </nav>
  );
}
