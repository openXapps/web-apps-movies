import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { RouteItems } from "@/lib/types";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
// import { Link } from "react-router-dom";

type NavDesktopProps = React.ComponentPropsWithoutRef<'nav'> & {
  routes: RouteItems;
};

export default function NavMobile({ routes, className }: NavDesktopProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const rrNavigate = useNavigate();

  const handleButtonClick = (href: string) => {
    setOpen(false);
    rrNavigate(href, { replace: true });
  };

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>

        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[300px]" aria-description="mobile menu" aria-describedby={undefined}>
          <SheetTitle className="">Filter By</SheetTitle>
          <div className="flex flex-col items-start gap-4 mr-6 mt-5">
            {routes.items.map((v, i) => (i < 3 &&
              <Button
                key={i}
                className="w-full"
                variant={pathname === v.href ? 'default' : 'link'}
                onClick={() => handleButtonClick(v.href)}
              >{v.route}</Button>
            ))}
          </div>
        </SheetContent>

      </Sheet>
    </div>
  );
}

{/* <Button key={i} asChild variant={pathname === v.href ? 'default' : 'link'} className="w-full">
                <Link
                  to={v.href}
                  className={pathname === v.href ? 'pointer-events-none' : 'pointer-events-auto'}
                  onClick={() => setOpen(false)}
                >{v.route}</Link>
              </Button> */}