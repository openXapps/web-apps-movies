import { useRouteError } from 'react-router-dom';

export default function NoPage() {
  const rrError = useRouteError();

  console.log(rrError);

  return (
    <div>NoPage</div>
  );
}
