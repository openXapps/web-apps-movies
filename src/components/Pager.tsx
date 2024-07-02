import { Button } from "./ui/button";

type PagerProps = {
  handlePagerClick: (navType: string, jump: number) => void;
}

export default function Pager({ handlePagerClick }: PagerProps) {
  return (
    <div className="flex justify-between m-3 gap-3">
      <Button className="" onClick={() => handlePagerClick('PAGE_ONE', 0)}>Page 1</Button>
      <Button className="w-full" onClick={() => handlePagerClick('PAGE', -1)}>Previous Page</Button>
      <Button className="w-full" onClick={() => handlePagerClick('PAGE', 1)}>Next Page</Button>
    </div>
  );
}
