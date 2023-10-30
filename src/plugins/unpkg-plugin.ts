import * as esbuild from "esbuild";

export const unpkgPlugin = {
  name: "unpkg-plugin",
  setup(build: esbuild.PluginBuild) {
    // handle index.js
    build.onResolve({ filter: /(^index\.js$)/ }, () => {
      return { path: "index.js", namespace: "pkg" };
    });

    // handle reslative paths in a module
    build.onResolve({ filter: /^\.+\// }, (args) => {
      return {
        namespace: "pkg",
        path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
      };
    });

    // // handle css
    // build.onResolve({ filter: /.(css|scss)$/ }, (args) => {
    //   return {
    //     path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
    //     namespace: "pkg",
    //   };
    // });

    // handle main file of a module
    build.onResolve({ filter: /.*/ }, (args) => {
      return { path: `https://unpkg.com/${args.path}`, namespace: "pkg" };
    });
  },
};
