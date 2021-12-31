import { json, Router } from "express";
import { promises as fs } from "fs";
import path from "path";

interface Cell {
  id: string;
  content: string;
  type: "text" | "code";
}
export const createCellsRouter = (filename: string, dir: string) => {
  const router = Router();
  router.use(json());

  const fullPath = path.join(dir, filename);

  router.get("/cells", async (req, res) => {
    try {
      const result = await fs.readFile(fullPath, { encoding: "utf-8" });
      res.send(JSON.parse(result));
    } catch (e: any) {
      if (e.code === "ENOENT") {
        await fs.writeFile(fullPath, "[]", "utf-8");
        res.send([]);
      } else {
        throw e;
      }
    }
  });

  router.post("/cells", async (req, res) => {
    const { cellsArr }: { cellsArr: Cell[] } = req.body;
    try {
      await fs.writeFile(fullPath, JSON.stringify(cellsArr), "utf-8");
      res.send({ message: "SUCCESS" });
    } catch (e: any) {
      console.log("Post cells: ", e.message);
    }
  });

  return router;
};
