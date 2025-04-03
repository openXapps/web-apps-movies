import {
  useState,
  useEffect,
  useContext,
  useRef
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';

// Shadcn/ui components
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

// Lucide icons
import {
  ArrowLeft,
  PanelLeft,
  Search
} from 'lucide-react';

// Custom components
import ModeToggle from '@/components/ModeToggle';

import { AppContext } from '@/context/AppProvider';
import { getRoute } from '@/lib/helper';
import { routes } from '@/lib/routes';
import { RouteId } from '@/lib/enums';
import { Separator } from './ui/separator';

export default function Header() {
  const { appState } = useContext(AppContext);
  const [route, setRoute] = useState(getRoute(appState.routeId));
  const rrNavigate = useNavigate();
  const { filter, title } = useParams();
  const searchRef = useRef<HTMLInputElement>(null);
  const [year, setYear] = useState<string>(String(new Date().getFullYear() - 1));
  const [yearList, setYearList] = useState<string[]>([]);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [subHeader, setSubHeader] = useState<string | undefined>('');


  useEffect(() => {
    setRoute(getRoute(appState.routeId));
    setSubHeader('');
    if (
      (appState.routeId === RouteId.SIMILAR ||
        appState.routeId === RouteId.FILTER_BY_CAST ||
        appState.routeId === RouteId.FILTER_BY_CREW) && title
    ) setSubHeader(title);
    if (
      (appState.routeId === RouteId.FILTER_BY_YEAR ||
        appState.routeId === RouteId.FILTER_BY_KEYWORD) && filter
    ) setSubHeader(filter);

    return () => { };
  }, [appState.routeId, title, filter])

  useEffect(() => {
    function genYears(): string[] {
      const today = new Date();
      const year = today.getFullYear();
      const yearList = [];
      for (let n = 0; n < 110; n++) {
        yearList.push(String(year - n));
      }
      return yearList;
    };

    setYearList(genYears());

    return () => { };
  }, [])

  const handleSearchAction = (e: React.FormEvent<HTMLFormElement | HTMLButtonElement>) => {
    e.preventDefault();
    if (searchRef.current?.value && searchRef.current?.value.length > 3) {
      setSheetOpen(false);
      rrNavigate(getRoute(RouteId.FILTER_BY_KEYWORD).href + '/' + encodeURI(searchRef.current?.value));
    }
  }

  const handleYearSelection = () => {
    if (year && year.length > 0) {
      setSheetOpen(false);
      rrNavigate(getRoute(RouteId.FILTER_BY_YEAR).href + '/' + year);
    }
  }

  const handleNavButtonClick = (routeId: number) => {
    setSheetOpen(false);
    // appState.searchScope && appDispatch({ type: 'SET_SCOPE', payload: '' });
    rrNavigate(routes[routeId].href, { replace: routes[routeId].replaceHistory });
  };

  return (
    <header className="fixed top-0 left-0 w-full h-14 z-10 border-b bg-opacity-90 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <h1 className="text-xl font-bold grow text-ellipsis overflow-hidden text-nowrap">{route.header} <span>{subHeader}</span></h1>
        {route.navBack ? (
          <Button variant="ghost" size="icon" onClick={() => rrNavigate(-1)}>
            <ArrowLeft className="h-[1.2rem] w-[1.2rem]" />
            <span className="sr-only">navigate back</span>
          </Button>
        ) : (
          <>
            <div className="hidden md:flex gap-1">
              {routes.map((v, i) => {
                const isActive = v.routeId === appState.routeId
                return (v.placement === 'HEADER' &&
                  <Button
                    key={i}
                    variant={isActive ? 'outline' : 'link'}
                    onClick={() => handleNavButtonClick(v.routeId)}
                    className={twMerge(isActive ? 'pointer-events-none' : '')}
                  >{v.menuItem}<span className="sr-only">{`navigate to ${v.menuItem}`}</span></Button>
                )
              })}
            </div>
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <PanelLeft className="h-[1.2rem] w-[1.2rem]" />
                  <span className="sr-only">toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent className='w-[320px]' side="left">
                <SheetHeader>
                  <SheetTitle>Filter Options</SheetTitle>
                  <SheetDescription className="sr-only">App Side Menu</SheetDescription>
                </SheetHeader>
                <div className='flex flex-col gap-5 mt-5'>

                  {/* Nav bar options on small screens */}
                  <div className="flex flex-col gap-2 md:hidden">
                    {routes.map((v, i) => {
                      const isActive = v.routeId === appState.routeId
                      return (v.placement === 'HEADER' &&
                        <Button
                          key={i}
                          variant={isActive ? 'default' : 'outline'}
                          onClick={() => handleNavButtonClick(v.routeId)}
                          className={twMerge(isActive ? 'pointer-events-none' : '')}
                        >{v.menuItem}<span className="sr-only">{`navigate to ${v.menuItem}`}</span></Button>
                      )
                    })}
                  </div>

                  {/* Side bar options on all screen sizes */}
                  <div className="flex flex-col gap-2">
                    {routes.map((v, i) => {
                      const isActive = v.routeId === appState.routeId
                      return (v.placement === 'SIDE_NAV' &&
                        <Button
                          key={i}
                          variant={isActive ? 'default' : 'outline'}
                          onClick={() => handleNavButtonClick(v.routeId)}
                          className={twMerge(isActive ? 'pointer-events-none' : '')}
                        >{v.menuItem}<span className="sr-only">{`navigate to ${v.menuItem}`}</span></Button>
                      )
                    })}
                  </div>

                  {/* Keyword and year search options on all screen sizes */}
                  <Separator />
                  <div className='flex flex-col gap-3'>
                    <div className="flex flex-row gap-2 justify-between">
                      <form onSubmit={handleSearchAction}>
                        <div className="relative flex-1">
                          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            className="pl-8"
                            type="search"
                            placeholder="Search by movie title..."
                            ref={searchRef}
                          />
                        </div>
                      </form>
                      <Button variant="outline" onClick={handleSearchAction}>Apply</Button>
                    </div>
                    <div className="flex flex-row gap-2 justify-between">
                      <div className="flex-1">
                        <Select value={year} onValueChange={setYear}>
                          <SelectTrigger>
                            <SelectValue placeholder="Search by year..." />
                          </SelectTrigger>
                          <SelectContent>
                            {yearList.map((v, i) => (
                              <SelectItem key={i} value={v}>{v}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button variant="outline" onClick={handleYearSelection}>Apply</Button>
                    </div>
                  </div>

                  {/* Side bar options on all screen sizes pushed to bottom */}
                  <Separator />
                  <div className="flex flex-col gap-2">
                    {routes.map((v, i) => {
                      const isActive = v.routeId === appState.routeId
                      return (v.placement === 'SIDE_NAV_BOTTOM' &&
                        <Button
                          key={i}
                          variant={isActive ? 'default' : 'outline'}
                          onClick={() => handleNavButtonClick(v.routeId)}
                          className={twMerge(isActive ? 'pointer-events-none' : '')}
                        >{v.menuItem}<span className="sr-only">{`navigate to ${v.menuItem}`}</span></Button>
                      )
                    })}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </>
        )}
        <ModeToggle />
      </div>
    </header >
  );
}
