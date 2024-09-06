import { twMerge } from "tailwind-merge";

type ToolbarProps = React.ComponentPropsWithoutRef<'div'> & {
  children?: React.ReactNode;
};

export default function Toolbar({ children, className, ...rest }: ToolbarProps) {

  return (
    <div className={twMerge("w-full h-14 bg-inherit", className)} {...rest}>{children}</div>
  );
}
