/**
 * Custom React hook to provide React Router Dom base path
 * @param pathname string Current path
 * @returns React Router Dom base path
 */
export default function useRoute(pathname: string): string {
  return pathname === '/'
    ? '/'
    : pathname.slice(0, pathname.lastIndexOf('/')+1);
}