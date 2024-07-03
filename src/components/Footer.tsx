import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "./ui/button";
import useRoute from "@/hooks/useRoute";

export default function Footer() {
  const rrNavigate = useNavigate();
  const { pathname } = useLocation();
  const { page } = useParams();
  const route = useRoute(pathname);

  // console.log('pathname =', pathname);
  // console.log('page     =', page);
  // console.log('route    =', route);

  const handlePagerClick = (navType: string, jump: number) => {
    // const totalPages = movies.total_pages;
    const totalPages = '500';
    window.scrollTo(0, 0);

    if (navType === 'PAGE_ONE' && page) {
      Number(page) > 1 && rrNavigate(`${route}/1`);
    }
    if (navType === 'PAGE_NEXT' && route === '/' && !page) {
      rrNavigate(`${route}/2`);
    }
    if (navType === 'PAGE_NEXT' && page) {
      Number(page) < Number(totalPages) && rrNavigate(`${route}/${Number(page) + jump}`);
    }
    if (navType === 'PAGE_PREV' && page) {
      Number(page) > 1 && rrNavigate(`${route}/${Number(page) + (jump)}`);
    }
  }
  return (
    <div className="fixed bottom-0 left-0 w-full h-14 z-10 border-t bg-opacity-80 dark:bg-opacity-80 bg-slate-200 dark:bg-gray-600">
      <div className="flex items-center gap-1 sm:gap-2 py-2 px-2 mx-auto max-w-[1024px]">
        <Button className="" onClick={() => handlePagerClick('PAGE_ONE', 0)}>Page 1</Button>
        <Button className="w-full" onClick={() => handlePagerClick('PAGE_PREV', -1)}>Previous Page</Button>
        <Button className="w-full" onClick={() => handlePagerClick('PAGE_NEXT', 1)}>Next Page</Button>
      </div>
    </div>
  );
}
