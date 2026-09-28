import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // The site scrolls smoothly (html { scroll-behavior: smooth }), which turns
    // the router's scroll-to-top on navigation into an animation that the new
    // page's render cancels — leaving a project page opened from the foot of
    // the home page sitting on its footer. Jump instantly instead.
    scrollRestorationBehavior: 'instant',
    defaultPreloadStaleTime: 0,
  });

  return router;
};
