import * as esbuild from "esbuild-wasm";
import { unpkgPathPlugin } from "../plugins/unpkg-path-plugin";
import { unpkgLoadPlugin } from "../plugins/unpkg-load-plugin";

let initialized = false;

const startService = async () => {
  try {
    await esbuild.initialize({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.13.15/esbuild.wasm",
    });

    initialized = true;
  } catch (error) {
    console.log(error);
  }
};

export const bundle = async (rawCode: string) => {
  if (!initialized) {
    await startService();
  }

  try {
    const res = await esbuild.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      plugins: [unpkgPathPlugin(), unpkgLoadPlugin(rawCode)],
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    });

    return {
      code: res.outputFiles[0].text,
      error: "",
    };
  } catch (err: any) {
    return {
      code: "",
      error: err.message as string,
    };
  }
};
