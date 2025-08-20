export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { verifySession } from "../../lib/token";
import { getPurchases } from "../../lib/store";
import Link from "next/link";

export default function Page() {
  const token = cookies().get("session")?.value;
  const session = verifySession(token);
  const email = session?.email || "unknown";
  const purchases = getPurchases(email);

  return (
    <div className="space-y-4">
      <h1>Dashboard</h1>
      <p className="opacity-80">Signed in as <strong>{email}</strong></p>
      <h3>Your purchases</h3>
      {purchases.length === 0 ? (
        <p className="opacity-70">No purchases yet. Visit the <Link className="underline" href="/shop">shop</Link>.</p>
      ) : (
        <ul className="list-disc pl-5">
          {purchases.map(p => (
            <li key={p}>
              {p} — <Link className="underline" href={`/downloads?productId=${p}`}>Download</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
