/**
 * Custom React hook to provide React Router Dom base path
 * @param pathname string Current path
 * @returns React Router Dom base path
 */
export default function useRoute(pathname: string, param: string | undefined): string {
  const newParam = param ? param : '';

  // console.log('pathname :', pathname);
  // console.log('param    :', newParam);

  // No parameter provided, return path as is
  if (newParam.length === 0) return pathname;
  // Not ideal, but if root path plus parameter, return hard root
  if (pathname.length < 4) return '/';

  // console.log('result   :', pathname.slice(0, pathname.lastIndexOf('/' + newParam)));

  // Else subtract parameter from path and return remainder
  return pathname.slice(0, pathname.lastIndexOf('/' + newParam));
}