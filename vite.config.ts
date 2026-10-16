// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    environments: {
      client: {
        build: {
          rollupOptions: {
            output: {
              // Rolldown's chunk groups. Left to itself the bundler writes every
              // shared lucide icon as its own file, and a page is twenty-odd
              // script requests before it can hydrate. Each group is a leaf (it
              // imports nothing from the main bundle): a group that did would
              // make a circular chunk import, and a module in it that reads an
              // import at top level would see it before it exists. Only the
              // matched modules move; their dependencies stay where they are.
              codeSplitting: {
                includeDependenciesRecursively: false,
                groups: [
                  // The site-wide data every page reads (photo paths, company
                  // details), in one file apart from the page bundles.
                  { name: "data", test: /[\\/]src[\\/]data[\\/](images|image-manifest|company)\.ts$/ },
                  // Icons shared by two or more pages.
                  { name: "icons", test: /node_modules[\\/]lucide-react[\\/]/, minShareCount: 2 },
                ],
              },
            },
          },
        },
      },
    },
  },
});
