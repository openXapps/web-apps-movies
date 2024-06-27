import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { RouteItems } from "@/lib/types";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { twMerge } from "tailwind-merge";

export default function NavMobile({ routes, className }: { routes: RouteItems, className: string }) {
  const [open, setOpen] = useState<boolean>(false);
  const { pathname } = useLocation();
  const rrNavigate = useNavigate();

  const handleButtonClick = (href: string) => {
    if (pathname !== href) {
      setOpen(false);
      rrNavigate(href, { replace: true });
    }
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
            {routes.map((v, i) => (i < 3 &&
              <Button
                key={i}
                className={twMerge(pathname === v.href ? 'cursor-context-menu' : 'cursor-pointer', 'w-full')}
                variant={pathname === v.href ? 'default' : 'link'}
                onClick={() => handleButtonClick(v.href)}
              // disabled={pathname === v.href}
              >{v.route}<span className="sr-only">{`navigate ${v.route}`}</span></Button>
            ))}
          </div>
        </SheetContent>

      </Sheet>
    </div>
  );
}
