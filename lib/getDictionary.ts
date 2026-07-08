import fs from "fs";
import path from "path";

export function getDictionary(lang: string) {
  const file = lang === "fr" ? "fr.json" : "en.json";
  const filePath = path.join(process.cwd(), "dictionaries", file);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content);
}
