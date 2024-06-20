
type CardProps = React.ComponentPropsWithoutRef<'div'> & {

};

export default function Card({ children }: CardProps) {

  return (
    <div className="h-[480px] max-w-xs bg-gray-500 border-yellow-500 border-2">
      <p>{children}</p>
    </div>
  )
}
