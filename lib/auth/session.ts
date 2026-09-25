import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export async function requireUser() {
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");
  return session.user;
}
