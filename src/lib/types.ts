/**
 * Router items type
 */
export type RouteItems = {
  href: string;
  route: string;
  title?: string;
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