import { Command } from "commander";
import { serve } from "@caderneta/local-api";
import path from "path";

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "caderneta.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      const resMsg = await serve(
        parseInt(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );
      console.log(resMsg);
    } catch (e: any) {
      if (e.code === "EADDRINUSE") {
        console.log("Port is in use. Try running on a different port");
      } else {
        console.log("Error occurred: ", e.message);
      }
      process.exit(1);
    }
  });
