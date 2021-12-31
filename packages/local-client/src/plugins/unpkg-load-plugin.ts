import axios from "axios";
import * as esbuild from "esbuild-wasm";
import localforage from "localforage";

const fileCache = localforage.createInstance({
  name: "filecache",
});

export const unpkgLoadPlugin = (input: string) => {
  return {
    name: "unpkg-load-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /(^index\.js$)/ }, async (args: any) => {
        console.log("[LOAD]: ", args);
        return {
          loader: "jsx",
          contents: input,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("[LOAD]: ", args);
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );
        if (cachedResult) {
          return cachedResult;
        }
        return null;
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        console.log("[LOAD]: ", args);

        const { data, request } = await axios.get(args.path);
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${data
            .replace(/\n/g, "")
            .replace(/"/g, '\\"')
            .replace(/'/g, "\\'")}'
          document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        console.log("[LOAD]: ", args);

        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await fileCache.setItem(args.path, result);
        return result;
      });
    },
  };
};
