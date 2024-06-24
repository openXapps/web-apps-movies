/**
 * Router items type
 */
export type RouteItems = {
  id: string;
  href: string;
  route: string;
  title: string;
  navBack: boolean;
}[]

/**
 * Movie data type
 */
export type Movies = {
  key: number;
  id: string;
  title: string;
  favourite: boolean;
}[]