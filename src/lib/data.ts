import type { AppContextState } from '@/lib/types';
import { RouteId } from '@/lib/enums';

// Initial route context state
export const initAppContextState: AppContextState = {
  routeId: RouteId.POPULAR,
};