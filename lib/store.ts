import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "purchases.json");

function ensure() {
  const dir = path.dirname(FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(FILE)) fs.writeFileSync(FILE, JSON.stringify({}), "utf-8");
}

export type PurchaseRecord = { [email: string]: string[] };

export function addPurchase(email: string, productId: string) {
  ensure();
  const raw = fs.readFileSync(FILE, "utf-8");
  const data = JSON.parse(raw || "{}") as PurchaseRecord;
  const arr = new Set<string>(data[email] || []);
  arr.add(productId);
  data[email] = Array.from(arr);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2), "utf-8");
}

export function getPurchases(email: string): string[] {
  ensure();
  const raw = fs.readFileSync(FILE, "utf-8");
  const data = JSON.parse(raw || "{}") as PurchaseRecord;
  return data[email] || [];
}
