import { Button } from "./ui/button";

type PagerProps = {
  handlePagerClick: (jump: number) => void;
}

export default function Pager({ handlePagerClick }: PagerProps) {
  return (
    <div className="flex justify-between my-3">
      <Button onClick={() => handlePagerClick(-1)}>Previous Page</Button>
      <Button onClick={() => handlePagerClick(1)}>Next Page</Button>
    </div>
  );
}
