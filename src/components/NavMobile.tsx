import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { RouteItems } from "@/lib/types";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

type NavDesktopProps = React.ComponentPropsWithoutRef<'nav'> & {
  routes: RouteItems;
};

export default function NavMobile({ routes, className }: NavDesktopProps) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className={className}>
      <Sheet open={open} onOpenChange={setOpen}>

        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="sm:hidden">
            <MenuIcon />
          </Button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[300px]">
          <div className="flex flex-col items-start gap-4 mr-6 mt-5">
            {routes.items.map((v, i) => (
              <Button key={i} asChild variant={pathname === v.href ? 'default' : 'link'} className="w-full">
                <Link
                  to={v.href}
                  className={pathname === v.href ? 'pointer-events-none' : 'pointer-events-auto'}
                  onClick={() => setOpen(false)}
                >{v.route}</Link>
              </Button>
            ))}
          </div>
        </SheetContent>

      </Sheet>
    </div>
  );
}
