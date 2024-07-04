/**
 * Custom React hook to provide React Router Dom base path
 * @param pathname string Current path
 * @returns React Router Dom base path
 */
export default function useRoute(pathname: string, param: string | undefined): string {
  let result: string = '';
  const newParam = param ? param : '';

  // console.log('pathname :', pathname);
  // console.log('param    :', newParam);

  if (newParam.length === 0) return result = pathname;
  if (pathname.length < 4) return result = '/';

  // console.log('result   :', pathname.slice(0, pathname.lastIndexOf('/' + newParam)));

  return pathname.slice(0, pathname.lastIndexOf('/' + newParam));
}