export const dynamic = "force-dynamic";
import { cookies } from "next/headers";
import { verifySession } from "../../lib/token";
import { getPurchases } from "../../lib/store";

function filenameFor(productId: string) {
  return {
    gratitude: "gratitude_journal.txt",
    stress: "stress_tracker.txt",
    ramadan: "ramadan_reflections.txt",
    workplace: "workplace_wellness.txt",
  }[productId as any] || "file.txt";
}

export default function Page({ searchParams }: { searchParams: { productId?: string } }) {
  const token = cookies().get("session")?.value;
  const session = verifySession(token);
  const email = session?.email || "";
  const owned = new Set(getPurchases(email));
  const id = searchParams.productId || "";
  const allowed = id && owned.has(id);

  return (
    <div className="space-y-4">
      <h1>Downloads</h1>
      {!id && <p>Select a product from your <a className="underline" href="/dashboard">dashboard</a>.</p>}
      {id && !allowed && <p className="text-red-600">You don’t have access to this product.</p>}
      {id && allowed && (
        <a className="btn btn-primary" href={`/api/download?productId=${id}`}>Download {filenameFor(id)}</a>
      )}
    </div>
  );
}
