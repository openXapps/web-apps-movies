import { navigation } from "@/lib/data";
import { RouteItem } from "@/lib/types";
import { useLocation } from "react-router-dom";

/**
 * Custom React hook to provide React Router Dom base path
 * @returns React Router base path
 */
export default function useRoute(): RouteItem {
  const { pathname } = useLocation();
  let route: RouteItem = navigation[0];
  const nav = navigation.filter(v => pathname.startsWith(v.href));

  if (nav.length > 0) route = nav[0];

  return route;
}

/**
 * Custom React hook to provide React Router Dom base path
 * @param {string} pathname React Router path
 * @returns React Router base path
 */
// export default function useRoute(pathname: string, params: Params<string>): string {
//   const arrPathname: string[] = pathname.split('/');
//   const page = params.page ? params.page : '1';
//   let newPathname: string = '/';

//   if (arrPathname.length > 0) {
//     if (arrPathname.length <= 2) newPathname = '/';
//     if (arrPathname.length > 2) {
//       if (arrPathname[2] === page) {
//         newPathname = '/' + arrPathname[1];
//       } else {
//         newPathname = '/' + arrPathname[1] + '/' + arrPathname[2];
//       }
//     }
//   }

//   console.log('params        :', params);
//   console.log('pathname      :', pathname);
//   console.log('pathname arr  :', arrPathname);
//   console.log('pathname new  :', newPathname);

//   return newPathname;
// }