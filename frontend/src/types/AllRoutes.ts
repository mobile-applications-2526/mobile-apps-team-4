import type * as ExpoRouter from '../../.expo/types/router';

type ExpoRoutes = ExpoRouter.ExpoRouter.__routes['href'];
type AllRoutes = Extract<ExpoRoutes, string>;

export default AllRoutes;