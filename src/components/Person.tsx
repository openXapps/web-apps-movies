import ghostPoster from '@/assets/ghost-poster.png';

type PersonProps = {
  imgId: string;
  data: {
    id: number;
    name: string;
    profile_path: string;
    role: string;
  };
  handleClick: (id: number, name: string) => void;
}

export default function Person({ imgId, data, handleClick }: PersonProps) {
  return (
    <figure className="shrink-0 w-[92px]">
      <div className="overflow-hidden rounded-md">
        {data.profile_path ? (
          <img
            id={imgId}
            className="rounded-lg cursor-pointer"
            src={`${import.meta.env.VITE_API_PERSON_POSTER_URL}/${data.profile_path}`}
            alt={data.name}
            onClick={() => handleClick(data.id, data.name)}
            onError={() => (document.getElementById(imgId) as HTMLImageElement).src = ghostPoster}
          />
        ) : (
          <img
            id={imgId}
            className="rounded-lg cursor-pointer"
            src={ghostPoster}
            alt={data.name}
            onClick={() => handleClick(data.id, data.name)}
          />
        )}
      </div>
      <figcaption className="pt-2 text-xs text-muted-foreground">
        <p className="text-ellipsis overflow-hidden text-nowrap">{data.name}</p>
        <p className="text-ellipsis overflow-hidden text-nowrap text-orange-700 dark:text-orange-500">{data.role}</p>
      </figcaption>
    </figure>
  );
}
