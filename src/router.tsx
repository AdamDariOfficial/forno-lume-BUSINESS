import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import {
  handleRouteError,
  RouteErrorFallback,
} from "./components/site/RouteErrorFallback";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultErrorComponent: RouteErrorFallback,
    defaultOnCatch: handleRouteError,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
