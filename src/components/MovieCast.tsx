import { useNavigate } from 'react-router-dom';

import { ScrollArea, ScrollBar } from './ui/scroll-area';
import Person from './Person';

import { RouteId } from '@/lib/enums';
import { getRoute } from '@/lib/helper';

import type { TmdbMovieCastData } from '@/lib/types';

type MovieCastProps = {
  data: TmdbMovieCastData[];
  layout: 'horizontal' | 'vertical';
}

export default function MovieCast({ data, layout }: MovieCastProps) {
  const rrNavigate = useNavigate();
  const movieCast = data.filter((v: TmdbMovieCastData) => v.known_for_department === 'Acting');

  const handleCastClick = (id: number, name: string) => {
    rrNavigate(`${getRoute(RouteId.FILTER_BY_CAST).href}/${id}/${encodeURI(name)}`);
  }

  return (
    <>
      {movieCast.length > 0 && (
        layout === 'horizontal' ? (
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="flex w-max space-x-4 p-4">
              {movieCast.map((v, i) => {
                const imgId = 'img-' + String(i);
                return (
                  <Person
                    key={imgId}
                    imgId={imgId}
                    data={{ id: v.id, name: v.name, profile_path: v.profile_path, role: v.character }}
                    handleClick={handleCastClick} />
                )
              })}
            </div>
            <ScrollBar orientation="horizontal" forceMount={true} />
          </ScrollArea>
        ) : (
          <div className="grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 justify-items-center">
            {movieCast.map((v, i) => {
              const imgId = 'img-' + String(i);
              return (
                <Person
                  key={imgId}
                  imgId={imgId}
                  data={{ id: v.id, name: v.name, profile_path: v.profile_path, role: v.character }}
                  handleClick={handleCastClick} />
              )
            })}
          </div>
        )
      )}
    </>
  )
}

