import { Button } from "./ui/button";

type PagerProps = {
  handlePagerClick: (jump: number) => void;
}

export default function Pager({ handlePagerClick }: PagerProps) {
  return (
    <div className="flex justify-between m-3 gap-3">
      <Button className="w-full" onClick={() => handlePagerClick(-1)}>Previous Page</Button>
      <Button className="w-full" onClick={() => handlePagerClick(1)}>Next Page</Button>
    </div>
  );
}
