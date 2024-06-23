import { useLocation, useNavigate } from "react-router-dom";
import { RouteItems } from "@/lib/types";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";

type NavDesktopProps = {
  routes: RouteItems;
  className: string;
};

export default function NavDesktop({ routes, className }: NavDesktopProps) {
  const { pathname } = useLocation();
  const rrNavigate = useNavigate();

  const handleButtonClick = (href: string) => {
    rrNavigate(href, { replace: true });
  };

  return (
    <nav className={twMerge('flex gap-1', className)}>
      {routes.map((v, i) => (i < 3 &&
        <Button
          key={i}
          variant={pathname === v.href ? 'default' : 'link'}
          onClick={() => handleButtonClick(v.href)}
        >{v.route}</Button>
      ))}
    </nav>
  );
}
