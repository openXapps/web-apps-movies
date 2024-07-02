// import { useState, useEffect } from 'react';
import { useMatches } from 'react-router-dom';

// https://github.com/remix-run/react-router/issues/8583

type useRouteProps = string & {
  location?: string;
  params?: string;
}
/**
 * Custom React hook return RRD route
 * @returns Current RRD route
 */
export default function useRoute(): useRouteProps {
  // const [route, setRoute] = useState('');
  const matches = useMatches();

  // console.log('rrLocation: ', location); 
  // console.log('rrParams  : ', params); 
  console.log('rrMatches  : ', matches);

  // useEffect(() => {
  //   return () => { }
  // }, [])

  return '';
}