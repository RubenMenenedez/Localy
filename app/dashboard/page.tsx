import Link from "next/link";
import { requireUser } from "@/lib/auth/session";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await requireUser();

  return (
    <main className="p-8">
      <p>Sesión iniciada como {user.email}</p>
      <Link href="/auth/sign-out" className="underline">
        Cerrar sesión
      </Link>
    </main>
  );
}
