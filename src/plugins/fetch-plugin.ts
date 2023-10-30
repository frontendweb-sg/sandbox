import axios from "axios";
import * as esbuild from "esbuild";
import localforage from "localforage";

const cache = localforage.createInstance({
  storeName: "file-cache",
});

export const fetchPlugin = (input: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index\.js/ }, async () => {
        return { loader: "jsx", contents: input };
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        let catchResult = await cache.getItem(args.path);
        if (catchResult) return catchResult;
      });

      build.onLoad({ filter: /.(css|scss)$/ }, async (args) => {
        const { data, request } = await axios.get(args.path);
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/\'/g, "\\'");
        const contents = `
        const style = document.createElement('style');
        style.innerText = '${escaped}';
        document.head.appendChild(style);
     `;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await cache.setItem(args.path, result);
        return result;
      });

      build.onLoad({ filter: /.*/ }, async (args: esbuild.OnLoadArgs) => {
        const { data, request } = await axios.get(args.path);

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await cache.setItem(args.path, result);
        return result;
      });
    },
  };
};
