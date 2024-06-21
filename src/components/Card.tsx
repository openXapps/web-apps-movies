import { useNavigate } from "react-router-dom";
import { Heart } from 'lucide-react';

type CardProps = React.ComponentPropsWithoutRef<'div'>;

export default function Card({ children }: CardProps) {
  const navigate = useNavigate();

  const handleImgClick = () => {
    navigate('/movie/1E5baAaEse26fej7uHcjOgEE2t2')
  };

  return (
    <div className="relative w-full bg-gray-500/50 rounded-lg overflow-hidden">
      <p className="text-center text-lg text-ellipsis overflow-hidden text-nowrap mx-1">{children}</p>
      <div>
      <img
        className="mx-auto cursor-pointer"
        src="https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg"
        alt="X"
        onClick={handleImgClick}
      />
      {/* <div className="absolute bottom-0 h-20 w-full max-[500px] p-3 bg-gradient-to-t from-white dark:from-black"> */}
      <div className="absolute bottom-0 h-12 w-full max-[500px] px-2 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-30">
        <Heart />
      </div>
      </div>
    </div>
  )
}
